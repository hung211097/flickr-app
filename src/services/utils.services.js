import _ from 'lodash'

export function getListIDPhotos(data){
  let temp = data.photo.map((item) => {
    return _.pick(item, ['id'])
  })

  temp.totalPages = data.pages
  return temp;
}

export function getInfoPhoto(info, sizes){
  let photo = _.merge(getSizePhoto(sizes, "Medium"), {
    username: _.result(info, 'owner.username'),
    title: _.result(info, 'title._content'),
    comment: _.result(info, 'comments._content'),
    id: _.result(info, 'photo.id')
  })

  return photo
}

export function getSizePhoto(sizes, label){
  for(let i = 0; i < sizes.length; i++){
    if(sizes[i].label === label)
    return sizes[i]
  }
  return null;
}
