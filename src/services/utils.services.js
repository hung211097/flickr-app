import _ from 'lodash'

export function getArrayPhotoMedium(data){
    let photo = data.photo.map((item) => {
      return getInfoPhotoMedium(item)
    })

    photo.totalPages = data.pages
    return photo
}

export function getInfoPhotoMedium(data){
  let photo = (_.pick(data, ['id', 'title', 'ownername', 'views', 'url_m', 'height_m', 'width_m']))
  return photo
}

export function getInfoPhoto(data, sizes){
  let photo = _.merge(_.pick(data, ['id', 'views']),{
    title: _.result(data, 'title._content'),
    description: _.result(data, 'description._content'),
    userid: _.result(data, 'owner.nsid'),
    username: _.result(data, 'owner.username'),
    create_on: _.result(data, 'dates.taken'),
    comments: _.result(data, 'comments._content'),
    tags: _.result(data, 'tags.tag')
  })
  let tempSize = getMediumImage(sizes.size)
  return _.merge(photo, _.pick(tempSize, ['source', 'height', 'width']))
}

function getMediumImage(sizes){
  for(let i = 0; i < sizes.length; i++){
    if(sizes[i].label === "Medium"){
      return sizes[i]
    }
  }
  return null;
}

export function getInfoUser(data){
  let user = _.pick(data, ['id', 'nsid', 'ispro', 'iconserver', 'iconfarm'])
  return user
}

export function getAvatar(data){
  return `http://farm${data.iconfarm}.staticflickr.com/${data.iconserver}/buddyicons/${data.nsid}.jpg`
}
