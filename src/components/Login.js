import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';


import Navbar from './Navbar'
import Footer from './Footer'
import Button from './Button'
import Error from './Error'
import { SITE_URL } from './constant/constant'
import { isUserLoggedIn, getUserData, setAuthorizationHeader } from './actions/actions'

function Login() {


    if (isUserLoggedIn()) {
        return <Navigate to='/dashboard'/>;
      }

    let loginState = {
        loading:false,
        error:'',
        email:'',
        password:'',
        loggedIn:isUserLoggedIn(),
    }
    const [ loginData, setLoginData ] = useState(loginState);

    const handleChange = (e) => {
        setLoginData({
            ... loginData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginData({
            ... loginData,
            error : '',
            loading : true,
        })
        let postData = {
            username: loginData.email,
            password: loginData.password
        }
    
    /*const setAuthorizationHeader = (token) => {
            const FBIdToken = `Bearer ${token}`
            localStorage.setItem('FBIdToken',`Bearer ${token}`);
            axios.defaults.headers.common['Authorization'] = FBIdToken ;
    } */   

        axios.post(`${SITE_URL}wp-json/jwt-auth/v1/token`, postData)
        .then(response => {
            const { token, user_email, user_nicename, user_display_name } = response.data
            if(!token){
                setLoginData({
                    ... loginData,
                    error : 'Authorization Failed',
                    loading : false,
                })
                return false
            }
            setAuthorizationHeader(token)
            

            return axios.post(`${SITE_URL}wp-json/wp/v2/users/me`);


        })
        .then(response => {
            var userObject = response.data 
            // Put the object into storage
            localStorage.setItem('userdata', JSON.stringify(userObject));
            /*var userObject = { user_email, user_nicename, user_display_name };

            // Put the object into storage
            localStorage.setItem('userdata', JSON.stringify(userObject));
            */
            setLoginData({
                ... loginData,
                error : '',
                loading : false,
                loggedIn:true
            });
           // this.props.history.push('/dashboard')
            window.location = "/dashboard"; 
        })
        .catch(error => {
            console.log(error);

            setLoginData({
                ... loginData,
                error : error.response.data.message,
                loading : false
            })
        })

        

    }
    
    if (loginData.loggedIn) {
        return <Navigate to='/dashboard'/>;
      }

  return (
    <>
    

        <Navbar />
        <div className='container m-5'>
            <div className='offset-md-6 col-md-4'>
            <h3 className='my-3'>Login Your Account</h3>
                {loginData.error.length>0 && <Error msg={loginData.error}/> }
                
                <form onSubmit={handleSubmit}>
                    <div class="form-group mb-3">
                        <input type="email" name="email" value={loginData.email} onChange={handleChange} class="form-control"  placeholder="Email" />
                    </div>
                    <div class="form-group mb-3">
                        <input type="password" name="password" value={loginData.password} onChange={handleChange} class="form-control"  placeholder="Password" />
                    </div>
                    <div class="form-group mb-3">
                        {/* <button type="submit" class="btn btn-danger">Login</button> */}
                        <Button btnClassName="btn btn-primary" loading={loginData.loading}>Login</Button>
                    </div>
                    
                </form>
            </div>
        
    </div>
    <Footer />
    </>  
    
  )
}

export default Login
