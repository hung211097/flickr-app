import { combineReducers } from 'redux'
import photosReducer from './photosReducer'
import tagReducer from './tagReducer'

export default combineReducers({
  photosReducer,
  tagReducer
})
