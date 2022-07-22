import { FETCH_POSTS_REQUEST,FETCH_POSTS_SUCCESS,FETCH_SINGLE_POST_SUCCESS,FETCH_POSTS_FAILURE,FETCH_MEDIA,FETCH_CATEGORIES,CREATE_POST,CLEAR_ERRORS, SITE_URL } from '../types'

const initialState = {
	loading: false,
	flag: false,
	posts:[],
	post_details:{},
    categories: [],
	message: ''
}


const postReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_POSTS_REQUEST :
            return {
                ... state,
                //loading: true,
                post_details: {}
            }
        case FETCH_POSTS_SUCCESS :
            return {
                ... state,
                //loading: false,
                posts: action.payload,
                message:'',
            }
        case FETCH_CATEGORIES : 
            return {
                ... state,
                message:'',
                categories: action.payload
            }
        case FETCH_SINGLE_POST_SUCCESS :
            return {
                ... state,
                //loading: false,
                post_details: action.payload,
                message:'',
            }
        case FETCH_MEDIA :
            return {
                ... state,
                post_details: { ...state.post_details, thumbnail_url:action.payload},
            }            
        case FETCH_POSTS_FAILURE :
            return {
                ... state,
                message:action.payload,
            }
        
        case CREATE_POST:
            return {
                ... state,
                flag: true,
                message:'Ads Created Successfully',
            }  
        case CLEAR_ERRORS:
            return {
                ... state,
                message:'',
            }         
        default : return state    
    }
}

export default postReducer;