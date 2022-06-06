import { FETCH_POSTS_REQUEST,FETCH_POSTS_SUCCESS,FETCH_SINGLE_POST_SUCCESS,FETCH_POSTS_FAILURE,FETCH_MEDIA, SITE_URL } from '../types'
const initialState = {
	loading: false,
	posts:[],
	post_details:{},
	error: ''
}


const postReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_POSTS_REQUEST :
            return {
                ... state,
                loading: true,
                post_details: {}
            }
        case FETCH_POSTS_SUCCESS :
            return {
                ... state,
                loading: false,
                posts: action.payload,
                error:'',
            }    
        case FETCH_SINGLE_POST_SUCCESS :
            return {
                ... state,
                loading: false,
                post_details: action.payload,
                error:'',
            }
        case FETCH_MEDIA :
            return {
                ... state,
                post_details: { ...state.post_details, thumbnail_url:action.payload},
            }            
        case FETCH_POSTS_FAILURE :
            return {
                ... state,
                loading: false,
                error:action.payload,
            }
        default : return state    
    }
}

export default postReducer;