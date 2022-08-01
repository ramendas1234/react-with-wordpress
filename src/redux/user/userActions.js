import axios from 'axios'
import { FETCH_USER_REQUEST,SET_AUTHENTICATED, SET_UNAUTHENTICATED ,SET_USER, SET_USER_ERRORS,USER_REGISTER, AVATAR_LOADING, SITE_URL } from '../types'


export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const loadingAvatar = () => {
    return {
        type: AVATAR_LOADING
    }
}

export const userRegistration = (success_msg) => {
    return {
        type: USER_REGISTER,
        payload: success_msg
    }
}


export const setAuthenticated = () => {
    return {
        type: SET_AUTHENTICATED,
    }
}

export const setUnAuthenticated = () => {
    return {
        type: SET_UNAUTHENTICATED,
    }
}

export const setUserError = (errors) => {
    return {
        type: SET_USER_ERRORS,
        payload: errors
    }
}

export const setUser = (data,successmsg='') => {
    return {
        type: SET_USER,
        payload: data,
        success_msg: successmsg
    }
}


export const loginUser = (postData) => (dispatch) => {
	dispatch(fetchUserRequest())
	axios.post(`${SITE_URL}wp-json/jwt-auth/v1/token`,postData)
    .then(response => {
        const { token } = response.data
    	setAuthorizationHeader(token);
        dispatch(setAuthenticated())
        dispatch(getUserData())
        setTimeout(function(){
            window.location = "/dashboard";
        },2000)
         
    })
    .catch(error => {
        console.log(error);
      dispatch(setUserError(error.response.data.message))
    })
}

export const registerUser = (postData) => (dispatch) => {
    dispatch(fetchUserRequest())
	axios.post(`${SITE_URL}wp-json/wp/v2/users/register`,postData)
    .then(response => {
        if(response.data.code==200){
            dispatch(userRegistration(response.data.message))
          }
          setTimeout(function(){
            window.location.href='/login'
          },2000);
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

export const isUserLoggedIn = () => (dispatch) => {
    const token = localStorage.FBIdToken;
    if(token==undefined || token==''){
        dispatch(setUnAuthenticated())
    }else{
        setAuthorizationHeader();
        axios.post(`${SITE_URL}wp-json/jwt-auth/v1/token/validate`)
        .then(response => {
            if(response.data.code=='jwt_auth_valid_token'){
                dispatch(setAuthenticated())
            }
        })
        .catch(error => {
            console.log(error.response.data.message)
            localStorage.removeItem('userdata');
            localStorage.removeItem('FBIdToken');
            delete axios.defaults.headers.common['Authorization'];
            dispatch(setUnAuthenticated())
        })
    }
    
    
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

export const updateUserData = (postData={},headers={},updateAvatar=false) => (dispatch) => {
    if(updateAvatar){
        dispatch(loadingAvatar())
    }else{
        dispatch(fetchUserRequest())
    }
    
	axios.post(`${SITE_URL}wp-json/wp/v2/users/me`,postData,headers)
	.then(response => {
        var userObject = response.data
        localStorage.setItem('userdata', JSON.stringify(userObject));
        let msg = 'Profile Updated Successflly'
		dispatch(setUser(userObject,msg))
	})
	.catch(error => dispatch(setUserError(error.response.data.message)))
}

export const logoutUser = () => (dispatch) =>{
    localStorage.removeItem('userdata');
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch(setUnAuthenticated())
    
}