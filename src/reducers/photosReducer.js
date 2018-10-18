import { actionTypes } from '../actions'

export default (state = {photos: [], nextPage: 1}, action) => {
  switch(action.type){
    case actionTypes.ADD_PHOTOS:
      return{
        ...state,
        photos: [...state.photos, ...action.photos],
        nextPage: action.nextPage
      }
    case actionTypes.CLEAR_PHOTOS:
      return{
        ...state,
        photos: []
      }
    default:
      return state
  }
}
