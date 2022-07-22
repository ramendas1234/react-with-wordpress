import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios';
import { Navigate, Link, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { getUserData, updateUserData, isUserLoggedIn } from '../redux'

// import { isUserLoggedIn, getUserData, setAuthorizationHeader } from './actions/actions'
import { SITE_URL } from './constant/constant'
import Button from './Button'
import Navbar from './Navbar'
import  Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DashboardNavigation from './DashboardNavigation'
import Footer from './Footer'
import './css/dashboard.css'

function UpdateProfile(props) {
    const navigate = useNavigate();
    const { userData, isUserLoggedIn, getUserData, updateUserData } = props
    const { user_details } = userData

 
     const initialState = {
        id:'',
        full_name:'',
        username:'',
        email:'',
        description:'',
        profile_image:''
    }

    const [ user, setUser ] = useState(initialState);
    useEffect(() => {
       
       if (userData.authenticated) {
             
            
            if("email" in user_details){
                const { user_meta:{ profile_image } } = user_details;
                setUser(user => ({ ...user, 
                    id: user_details.id?user_details.id:'',
                    full_name:user_details.first_name+' '+user_details.last_name,
                    username: user_details.username,
                    email: user_details.email,
                    description: user_details.description,
                    profile_image: profile_image
                 }));

                
            }else{
                getUserData()
            }
            
        }else{
            isUserLoggedIn()
        }
        

    },[userData.authenticated,user_details]) 

    /*useEffect(() => {
        if("email" in user_details){
            const { id, username, first_name, last_name,email, description } = user_details;
            //const [ user, setUser ] = useState({full_name:first_name+' '+last_name, id, username, email, description });
           
            setUser({
                ... user,
                id: user_details.id?user_details.id:'',
                email: user_details.email?user_details.email:'',
            })
        } 
    },[user]) */
    
    
    //const { id, username, first_name, last_name,email, description, user_meta:{ profile_image } } = user_details;
    
    
    
    
    const imgUpload = useRef(null);
    const [img, setImg] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    //console.log(user);


    const handleChange = (e) => {
        setUser({
            ... user,
            [e.target.name] : e.target.value
        })
    }

    const splitName = (name = '') => {
        const [firstName, ...lastName] = name.split(' ').filter(Boolean);
        return {
          firstName: firstName,
          lastName: lastName.join(' ')
        }
      }

      const updateItem = (event) => {
        if(imgUpload.current.files.length > 0){
            var formData = new FormData();
            let file = imgUpload.current.files[0];
            formData.append( 'image', file );
            formData.append( 'title', file.name );
            let headers = {};
            headers['Content-Disposition'] = 'form-data; filename=\''+file.name+'\'';
            updateUserData(formData, headers, true);
        }
    }  
    /*const updateItem = (event) => {
        if(imgUpload.current.files.length > 0){
            setImageLoading(true);
            var formData = new FormData();
            let file = imgUpload.current.files[0];
            formData.append( 'image', file );
            formData.append( 'title', file.name );
            let headers = {};
            headers['Content-Disposition'] = 'form-data; filename=\''+file.name+'\'';
            axios.post(`${SITE_URL}wp-json/wp/v2/users/me`,formData, headers )
            .then(response => {
                var userObject = response.data
                const { user_meta:{ profile_image } } = userObject
                localStorage.setItem('userdata', JSON.stringify(userObject));
                setImg(profile_image);
                setImageLoading(false)

            })
            .catch(error => {
                console.log(error.response.data)
            });
        }
    } */

    const handleSubmit = (event) => {
        event.preventDefault();
        const full_name = splitName(user.full_name);
        //console.log();
        let postData = {
            first_name: full_name.firstName,
            last_name: full_name.lastName,
            email: user.email,
            description: user.description
        }

        updateUserData(postData)
        //console.log(postData); return false;

        
        /*axios.post(`${SITE_URL}wp-json/wp/v2/users/me`, postData)
        .then(response=>{
            //console.log(response)
            var userObject = response.data
            localStorage.setItem('userdata', JSON.stringify(userObject));
            setUser({... user, loading:false, flag:true,msg:'profile updated successfully'})
            
        })
        .catch(error=>{
            console.log(error.response.data);
            
            setUser({... user, loading:false, flag:false,msg:error.response.data.message})
            console.log(user);
        }) */
    }


    //let alertClass = (userData.flag)?'success':'danger'
    let opacityClass = (imageLoading)?'opacity-100':''
    

  return (
    <>
        <Navbar />
        {/* <div className='container'>
            Welcome { userData.user_display_name }
        </div> */}
        <div class="container-fluid display-table height-100">
          <div class="row height-100">
          <DashboardNavigation/>
              <div class="col-md-10 col-sm-11 display-table-cell v-align" style={{height: "100vh"}}>
                  
                  <div class="user-dashboard py-5">
                      
                      <div class="row">

                      
                          <div class="offset-md-3 col-md-4 col-sm-5 col-xs-12 gutter">
                          
                              <h2 className='mb-5'>Update Profile</h2>
                              {userData.error.length>0 &&  (
                                    <Alert  variant="danger">
                                    {userData.error}
                                    </Alert>
                                ) }

                                {userData.success_msg.length>0 &&  (
                                    <Alert  variant="success">
                                    {userData.success_msg}
                                    </Alert>
                                ) }  
                                
                                
                              <form>
                                    <div class="preview text-center">
                                        <img class="preview-img" src={user.profile_image} alt="Preview Image" width="200" height="200"/>
                                        
                                        
                                        <div class={`browse-button`}  >
                                        {userData.avatar_loading && <Spinner animation="border" variant="primary" />}
                                        
                                            <i class="fa fa-pencil-alt"></i>
                                            <input class="browse-input" type="file" id="UploadedFile" ref={imgUpload} onChange={updateItem} />
                                        </div>
                                        <span class="Error"></span>
                                  </div>
                              </form>
                              <form onSubmit={handleSubmit}>
                                  
                                  <div class="form-group mb-3">
                                      <label>Full Name:</label>
                                      <input class="form-control" type="text" name="full_name" value={user.full_name} onChange={handleChange} placeholder="Enter Your Full Name"/>
                                      <span class="Error"></span>
                                  </div>
                                  <div class="form-group mb-3">
                                      <label>Email:</label>
                                      <input class="form-control" type="email" name="email" value={user.email} required onChange={handleChange} placeholder="Enter Your Email"/>
                                      <span class="Error"></span>
                                  </div>
                                  {/* <div class="form-group mb-3">
                                      <label>Password:</label>
                                      <input class="form-control" type="password" name="password" required onChange={handleChange} placeholder="Enter Password"/>
                                      <span class="Error"></span>
                                  </div> */}
                                  <div class="form-group mb-3">
                                      <label>Description:</label><br/>
                                      <textarea class="form-control" name="description" value={user.description} onChange={handleChange} >{user.description}</textarea>
                                      <span class="Error"></span>
                                  </div>
                                  <div class="form-group mb-3">
                                      {/* <input class="btn btn-primary btn-block" type="submit" value="Update"/> */}
                                      <Button btnClassName="btn btn-primary" loading={userData.btn_loading}>Update</Button>
                                  </div>
                              </form>
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>

      </div>
    
    </>
  )
}


const mapStateToProps = (store) => {
    return {
        userData: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isUserLoggedIn: () => {
            dispatch(isUserLoggedIn())
        },
        getUserData: () => {
            dispatch(getUserData())
        },
        updateUserData: (postData,headers,updateAvatar) => {
            dispatch(updateUserData(postData,headers,updateAvatar))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)