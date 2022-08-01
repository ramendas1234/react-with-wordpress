import React, { useState, useEffect } from 'react'
import axios from 'axios'
// redux stuff
import { connect } from 'react-redux'
import { loginUser, isUserLoggedIn } from '../redux'
import { Navigate, useNavigate } from 'react-router-dom';


import Navbar from './Navbar'
import Footer from './Footer'
import Button from './Button'
import Error from './Error'
import Loader from './Loader';
import { SITE_URL } from './constant/constant'
//import { isUserLoggedIn, getUserData, setAuthorizationHeader } from './actions/actions'

function Login(props) {

    //console.log(props)
    const navigate = useNavigate();
    const { uiData, userData, loginUser, isUserLoggedIn } = props
    /*if (userData.authenticated) {
        //return <Navigate to='/dashboard'/>;
        navigate('/dashboard')
    } */
    
    
    

    let loginState = {
        // loading:false,
        // error:'',
        email:'',
        password:'',
        //loggedIn:userData.authenticated,
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
        
        let postData = {
            username: loginData.email,
            password: loginData.password
        }

        loginUser(postData)
    
    }
    
    // if (userData.authenticated) {
    //     return <Navigate to='/dashboard'/>;
    //   }

    if(uiData.page_loading){
        return <Loader />;
    }else{
        return userData.authenticated === true ? <Navigate to="/dashboard" replace /> : (

            <>
    

                <Navbar />
                        {!userData.authenticated && 
                        
                        <div className='container m-5'>
                            <div className='offset-md-6 col-md-4'>
                            <h3 className='my-3'>Login Your Account</h3>
                                {userData.error.length>0 && <Error msg={userData.error}/> }
                                
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group mb-3">
                                        <input type="email" name="email" value={loginData.email} onChange={handleChange} class="form-control"  placeholder="Email" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type="password" name="password" value={loginData.password} onChange={handleChange} class="form-control"  placeholder="Password" />
                                    </div>
                                    <div class="form-group mb-3">
                                        {/* <button type="submit" class="btn btn-danger">Login</button> */}
                                        <Button btnClassName="btn btn-primary" loading={userData.btn_loading}>Login</Button>
                                    </div>
                                    
                                </form>
                            </div>
                        
                    </div>
                        }
                        
                    <Footer />
            </>
        );
    }

//   return (
//     <>
    

//         <Navbar />
//         {!userData.authenticated && 
        
//         <div className='container m-5'>
//             <div className='offset-md-6 col-md-4'>
//             <h3 className='my-3'>Login Your Account</h3>
//                 {userData.error.length>0 && <Error msg={userData.error}/> }
                
//                 <form onSubmit={handleSubmit}>
//                     <div class="form-group mb-3">
//                         <input type="email" name="email" value={loginData.email} onChange={handleChange} class="form-control"  placeholder="Email" />
//                     </div>
//                     <div class="form-group mb-3">
//                         <input type="password" name="password" value={loginData.password} onChange={handleChange} class="form-control"  placeholder="Password" />
//                     </div>
//                     <div class="form-group mb-3">
//                         {/* <button type="submit" class="btn btn-danger">Login</button> */}
//                         <Button btnClassName="btn btn-primary" loading={userData.btn_loading}>Login</Button>
//                     </div>
                    
//                 </form>
//             </div>
        
//     </div>
//         }
        
//     <Footer />
//     </>  
    
//   )
}

const mapStateToProps = (store) => {
    return {
        uiData: store.ui,
        userData: store.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loginUser : (postData) => {
            dispatch(loginUser(postData))
        },
        isUserLoggedIn: () => {
            dispatch(isUserLoggedIn())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
