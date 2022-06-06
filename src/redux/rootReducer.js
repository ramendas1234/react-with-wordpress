import { combineReducers } from 'redux';
import postReducer from './post/postReducers';
const rootReducer = combineReducers({
	post: postReducer
})

export default rootReducer