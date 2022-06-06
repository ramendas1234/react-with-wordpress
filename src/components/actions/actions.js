import axios from 'axios';

export const isUserLoggedIn = () => {
    const token = localStorage.FBIdToken;
    return token ? true : false
}

export const getUserData = () => {
    const data = JSON.parse(localStorage.userdata) ;
    return data ;
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

export const logoutUser = () => {
    localStorage.removeItem('userdata');
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
}