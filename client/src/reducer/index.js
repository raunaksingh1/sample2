import {combineReducers} from 'redux'
import errorreducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
    errors:errorreducer,
    auth: authReducer
})