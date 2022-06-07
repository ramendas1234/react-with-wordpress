import { FETCH_USER_REQUEST, SET_AUTHENTICATED,SET_USER_ERRORS,SET_USER, SITE_URL } from '../types'
const initialState = {
	btn_loading: false,
    authenticated: false,
	user_details:{},
	error: ''
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST : 
            return {
                ... state,
                btn_loading: true
            }
        case SET_AUTHENTICATED : 
            return {
                ... state,
                authenticated: true
            }    
        case SET_USER:
            return {
                ... state,
                btn_loading: false,
                error:'',
                authenticated: true,
                user_details: action.payload
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