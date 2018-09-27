import {config} from '../config'
import {getListIDPhotos, getInfoPhoto} from './utils.services'
import axios from 'axios';

export default () => {
    let services = {
        getInterestPhotos: (page = 1, limit = 10) => {
          return axios.get(`${config.apiUrl}?method=flickr.interestingness.getList&api_key=${config.KEY_API}&format=json&nojsoncallback=1&page=${page}&per_page=${limit}`).then((data) => {
            return getListIDPhotos(data.data.photos)
          })
        },
        getInfoPhotoById: (id) => {
          let info = axios.get(`${config.apiUrl}?method=flickr.photos.getInfo&api_key=${config.KEY_API}&format=json&nojsoncallback=1&photo_id=${+id}`)
          let size = axios.get(`${config.apiUrl}?method=flickr.photos.getSizes&api_key=${config.KEY_API}&format=json&nojsoncallback=1&photo_id=${+id}`)
          return Promise.all([info, size]).then(([infoPhoto, sizePhoto]) => {
            return getInfoPhoto(infoPhoto.data.photo, sizePhoto.data.sizes.size)
          })
        }
    }

    return services
}
