import { actionTypes } from '../actions'

export default (state = {}, action) => {
  switch(action.type){
    case actionTypes.UPDATE_TAG:
      return{
        tag: action.tag
      }
    default:
      return state
  }
}
