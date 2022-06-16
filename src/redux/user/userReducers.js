import { FETCH_USER_REQUEST, SET_AUTHENTICATED, SET_UNAUTHENTICATED ,SET_USER_ERRORS,SET_USER, USER_REGISTER, AVATAR_LOADING, SITE_URL } from '../types'
const initialState = {
	btn_loading: false,
    authenticated: false,
    avatar_loading:false,
	user_details:{},
	error: '',
    success_msg:''
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST : 
            return {
                ... state,
                btn_loading: true
            }
        case AVATAR_LOADING :
            return {
                ... state,
                avatar_loading: true
            }    
        case SET_AUTHENTICATED : 
            return {
                ... state,
                authenticated: true
            } 
        case SET_UNAUTHENTICATED :
            return {
                ... state,
                authenticated: false
            }       
        case SET_USER:
            return {
                ... state,
                btn_loading: false,
                avatar_loading: false,
                error:'',
                authenticated: true,
                user_details: action.payload,
                success_msg: action.success_msg
            } 
        case USER_REGISTER:
            return {
                ... state,
                btn_loading: false,
                error:'',
                success_msg: action.payload
            }
        case SET_USER_ERRORS :
            return {
                ... state,
                btn_loading: false,
                error: action.payload
            }
        default:
            return state    
    }
}

export default userReducer;