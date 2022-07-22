import { combineReducers } from 'redux';
import uiReducer from './ui/uiReducers';
import postReducer from './post/postReducers';
import userReducer from './user/userReducers';
const rootReducer = combineReducers({
	ui: uiReducer,
	post: postReducer,
	user: userReducer
})

export default rootReducer