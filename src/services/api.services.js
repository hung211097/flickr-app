import {config} from '../config'
import {getArrayPhotoMedium, getInfoPhoto, getInfoUser} from './utils.services'
import axios from 'axios';

export default () => {
    let services = {
        getInterestPhotos: (page = 1, limit = 10) => {
          return axios.get(`${config.apiUrl}?method=flickr.interestingness.getList&api_key=${config.KEY_API}&extras=media%2Curl_m%2Cowner_name%2Cviews&format=json&nojsoncallback=1&page=${page}&per_page=${limit}`).then((data) => {
            return getArrayPhotoMedium(data.data.photos)
          })
        },
        getInfoPhoto: (id) => {
          let photo = axios.get(`${config.apiUrl}?method=flickr.photos.getInfo&api_key=${config.KEY_API}&photo_id=${id}&format=json&nojsoncallback=1`)
          let size = axios.get(`${config.apiUrl}?method=flickr.photos.getSizes&api_key=${config.KEY_API}&photo_id=${id}&format=json&nojsoncallback=1`)
          return Promise.all([photo, size]).then(([Photo, Size]) => {
            return getInfoPhoto(Photo.data.photo, Size.data.sizes)
          })
        },
        getInfoUser: (id) => {
          return axios.get(`${config.apiUrl}?method=flickr.people.getInfo&api_key=${config.KEY_API}&user_id=${id}&format=json&nojsoncallback=1`).then((data) => {
            return getInfoUser(data.data.person)
          })
        },
        getPhotosByTags: (tag, page = 1, limit = 10) => {
          return axios.get(`${config.apiUrl}?method=flickr.photos.search&api_key=${config.KEY_API}&tags=${tag}&extras=media%2C+url_m%2C+owner_name%2Cviews&format=json&nojsoncallback=1&page=${page}&per_page=${limit}`).then((data) => {
            return getArrayPhotoMedium(data.data.photos)
          })
        },
    }

    return services
}
