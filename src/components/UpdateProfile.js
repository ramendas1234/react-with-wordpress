import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

import { isUserLoggedIn, getUserData, setAuthorizationHeader } from './actions/actions'
import { SITE_URL } from './constant/constant'
import Button from './Button'
import Navbar from './Navbar'
import  Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DashboardNavigation from './DashboardNavigation'
import Footer from './Footer'
import './css/dashboard.css'

export default function UpdateProfile() {
    if (!isUserLoggedIn()) {
        return <Navigate to='/login'/>;
      }else{
        setAuthorizationHeader();
      }

    const { id, username, first_name, last_name,email, description, user_meta:{ profile_image } } = getUserData();
    const [ user, setUser ] = useState({loading:false,flag:false,msg:'',full_name:first_name+' '+last_name, id, username, email, description });
    const imgUpload = useRef(null);
    const [img, setImg] = useState(profile_image);
    const [imageLoading, setImageLoading] = useState(false);




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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser({... user, loading:true})
        //console.log(user.full_name); return false;
        const full_name = splitName(user.full_name);
        //console.log();
        let postData = {
            first_name: full_name.firstName,
            last_name: full_name.lastName,
            email: user.email,
            description: user.description
        }

        //console.log(postData); return false;

        
        axios.post(`${SITE_URL}wp-json/wp/v2/users/me`, postData)
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
        })
    }


    let alertClass = (user.flag)?'success':'danger'
    let opacityClass = (imageLoading)?'opacity-100':''
    

  return (
    <>
        <Navbar />
        {/* <div className='container'>
            Welcome { userData.user_display_name }
        </div> */}
        <div class="container-fluid display-table">
          <div class="row">
              <div class="col-md-2 col-sm-1 p-3 text-white bg-dark" id="dashboard-navigation">
                  
                  
              <DashboardNavigation/>


              </div>
              <div class="col-md-10 col-sm-11 display-table-cell v-align" style={{height: "100vh"}}>
                  
                  <div class="user-dashboard py-5">
                      
                      <div class="row">

                      
                          <div class="offset-md-3 col-md-4 col-sm-5 col-xs-12 gutter">
                          
                              <h2 className='mb-5'>Update Profile</h2>
                              {user.msg.length>0 &&  (
                                    <Alert  variant={alertClass}>
                                    {user.msg}
                                    </Alert>
                                ) }
                                
                                
                              <form>
                                    <div class="preview text-center">
                                        <img class="preview-img" src={img} alt="Preview Image" width="200" height="200"/>
                                        
                                        
                                        <div class={`browse-button`}  >
                                        {imageLoading && <Spinner animation="border" variant="primary" />}
                                        
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
                                      <Button btnClassName="btn btn-primary" loading={user.loading}>Update</Button>
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
