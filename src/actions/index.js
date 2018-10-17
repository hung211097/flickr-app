export const actionTypes = {
    CLEAR_PHOTOS: 'CLEAR_PHOTOS',
    ADD_PHOTOS: 'ADD_PHOTOS',
    UPDATE_TAG: 'UPDATE_TAG'
}

export const addPhotos = (data) => {
  return{
    type: actionTypes.ADD_PHOTOS,
    photos: data.photos,
    nextPage: data.nextPage
  }
}

export const clearPhotos = () => {
  return{
    type: actionTypes.CLEAR_PHOTOS
  }
}

export const updateTag = (tag) => {
  return{
    type: actionTypes.UPDATE_TAG,
    tag: tag
  }
}
