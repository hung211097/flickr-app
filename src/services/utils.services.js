import _ from 'lodash'

export function getArrayPhotoMedium(data){
    let photo = data.photo.map((item) => {
      return getInfoPhotoMedium(item)
    })

    photo.totalPages = data.pages
    return photo
}

export function getInfoPhotoMedium(data){
  let photo = (_.pick(data, ['id', 'title', 'ownername', 'url_m', 'height_m', 'width_m']))
  return photo
}
