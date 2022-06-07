import axios from 'axios'
import { FETCH_USER_REQUEST,SET_AUTHENTICATED,SET_USER, SET_USER_ERRORS, SITE_URL } from '../types'


export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}


export const setAuthenticated = () => {
    return {
        type: SET_AUTHENTICATED,
    }
}

export const setUserError = (errors) => {
    return {
        type: SET_USER_ERRORS,
        payload: errors
    }
}

export const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}


export const loginUser = (postData) => (dispatch) => {
	dispatch(fetchUserRequest())
	axios.post(`${SITE_URL}wp-json/jwt-auth/v1/token`,postData)
    .then(response => {
        console.log(response.data);
        const { token } = response.data
    	setAuthorizationHeader(token);
        dispatch(setAuthenticated())
        dispatch(getUserData())
        //window.location = "/dashboard"; 
    })
    .catch(error => {
        console.log(error);
      dispatch(setUserError(error.response.data.message))
    })
}


export const setAuthorizationHeader = (token='') => {

    if(token!=''){
        var FBIdToken = `Bearer ${token}`
        localStorage.setItem('FBIdToken',`Bearer ${token}`);
    }else{
        var FBIdToken = localStorage.FBIdToken;
    }
    axios.defaults.headers.common['Authorization'] = FBIdToken ;
}


export const getUserData = () => (dispatch) => {
    
	axios.post(`${SITE_URL}wp-json/wp/v2/users/me`)
	.then(response => {
        var userObject = response.data
        localStorage.setItem('userdata', JSON.stringify(userObject));
		dispatch(setUser(userObject))
	})
	.catch(err => console.log(err))
}