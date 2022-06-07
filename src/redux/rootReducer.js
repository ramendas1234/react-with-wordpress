import { combineReducers } from 'redux';
import postReducer from './post/postReducers';
import userReducer from './user/userReducers';
const rootReducer = combineReducers({
	post: postReducer,
	user: userReducer
})

export default rootReducer