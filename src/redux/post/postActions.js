import axios from 'axios'
import { FETCH_POSTS_REQUEST,FETCH_POSTS_SUCCESS,FETCH_SINGLE_POST_SUCCESS, FETCH_POSTS_FAILURE,FETCH_MEDIA, SITE_URL } from '../types'

export const fetchPostsRequest = () => {
    return {
		type: FETCH_POSTS_REQUEST
	}
} 

export const fetchPostsSuccess = (data) => {
    return {
		type: FETCH_POSTS_SUCCESS,
        payload: data
	}
}

export const fetchSinglePostSuccess = (data) => {
    return {
		type: FETCH_SINGLE_POST_SUCCESS,
        payload: data
	}
}

export const fetchMediaData = (data) => {
    return {
		type: FETCH_MEDIA,
        payload: data
	}
}

export const fetchPostsFailure = (error) => {
    return {
		type: FETCH_POSTS_FAILURE,
        payload: error
	}
} 

export const fetchPosts = () => {
    return (dispatch) => {
        
        dispatch(fetchPostsRequest())
		axios.get(`${SITE_URL}/wp-json/wp/v2/posts`)
		.then(response => {
			const posts = response.data
            
			dispatch(fetchPostsSuccess(posts))
		})
		.catch(error => {
			const errorMsg = error.message
			dispatch(fetchPostsFailure(errorMsg))
		})
    }
}


export const fetchPostThumbnail = (thumbnailId) => {
    
    return (dispatch) => {
        axios.get(`${SITE_URL}/wp-json/wp/v2/media/${thumbnailId}`)
        .then(response => {
            const data = response.data
            const { guid:{rendered} } = response.data
            let thumbnailUrl = rendered;
            dispatch(fetchMediaData(thumbnailUrl))
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}

export const fetchPostDetail = (postId) => {
    
    return (dispatch) => {
        dispatch(fetchPostsRequest())
        axios.get(`${SITE_URL}/wp-json/wp/v2/posts/${postId}`)
        .then(response => {
            
            const data = response.data
            dispatch(fetchSinglePostSuccess(data))
            const { featured_media } = response.data
            dispatch(fetchPostThumbnail(featured_media))
            
        })
        .catch(error => {
            const errorMsg = error.message
			dispatch(fetchPostsFailure(errorMsg))
        })
    }
}


