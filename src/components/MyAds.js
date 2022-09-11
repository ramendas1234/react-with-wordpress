import React, { useState,useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom';
import { sanitize } from 'dompurify';
// redux stuff
import { connect } from 'react-redux'
import { loginUser, fetchUserAds } from '../redux'


//import { isUserLoggedIn, getUserData } from './actions/actions'
import Table from 'react-bootstrap/Table';
//import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar'
import DashboardNavigation from './DashboardNavigation'
import Footer from './Footer'
import EditAds from './EditAds'

import './css/dashboard.css'



function MyAds(props) {
  
    
      const { userData:{user_details,user_posts},fetchUserAds  } = props

      const [editModalShow, setEditModalShow] = useState(false);

      const handleEditModalClose = () => {
        setEditModalShow(false);
      }
      const handleEditModalShow = (adsData) => {
        console.log(adsData)
        setEditModalShow(true);
        <EditAds/>
        
      }

      useEffect(()=>{
        fetchUserAds(user_details.id)
      },[])
      
  return (
    <>
        <Navbar />
        
        <div class="container-fluid display-table">
          <div class="row">
              <div class="col-md-2 col-sm-1 p-3 text-white bg-dark" id="dashboard-navigation">
                  
                  
              <DashboardNavigation />


              </div>
              <div class="col-md-10 col-sm-11 display-table-cell v-align" style={{height: "100vh"}}>
                  
                  <div class="user-dashboard py-5">
                      
                      <div class="row">

                      
                          <div class="offset-md-1 col-md-10 col-sm-12 col-xs-12 gutter">
                          
                              <h2 className='mb-5'>My Ads</h2>
                            {user_posts.length>0 && (
                                <Table striped bordered hover className='text-center'>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {user_posts.map((post,index) => (
                                      <tr key={index} >
                                        <td>{post.id}</td>
                                        <td>{ post.title.rendered.substring(0, 40) }</td>
                                        <td dangerouslySetInnerHTML={{ __html: sanitize(post.excerpt.rendered.substring(0, 80)) }} />
                                        <td><a href='#' onClick={()=> handleEditModalShow(post)}><i class="fa-solid fa-pencil"></i></a> | <a className='btn-danger' href='#'><i class="fa-solid fa-trash"></i></a></td>
                                      </tr>
                                  ))}
                                    
                                </tbody>
                            </Table>
                            )}
                              
                              
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>

      </div>


      <Modal
        show={editModalShow}
        onHide={handleEditModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}


const mapStateToProps = (store) => {
  return {
      userData: store.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchUserAds: (id) => {
          dispatch(fetchUserAds(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAds)