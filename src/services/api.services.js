import {config} from '../config'
import {getArrayPhotoMedium} from './utils.services'
import axios from 'axios';

export default () => {
    let services = {
        getInterestPhotos: (page = 1, limit = 10) => {
          return axios.get(`${config.apiUrl}?method=flickr.interestingness.getList&api_key=${config.KEY_API}&extras=media%2Curl_m%2Cowner_name%2Cviews&format=json&nojsoncallback=1&page=${page}&per_page=${limit}`).then((data) => {
            return getArrayPhotoMedium(data.data.photos)
          })
        },
    }

    return services
}
