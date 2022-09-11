import React from 'react'
import { Navigate, Link } from 'react-router-dom';

import { isUserLoggedIn, getUserData } from './actions/actions'
import Col from 'react-bootstrap/Col'
import Navbar from './Navbar'
import Footer from './Footer'
import './css/dashboard.css'

export default function DashboardNavigation() {
    // if (!isUserLoggedIn()) {
    //     return <Navigate to='/login'/>;
    //   }
    //let userData = getUserData();
  return (
    <>
    <Col className='height-100 bg-dark'>
    <div className='mt-5 p-3 text-white' id="dashboard-navigation">
            <ul class="nav nav-pills flex-column mb-auto">
                      <li class="nav-item">
                        <Link className="nav-link text-white" to='/dashboard'>Dashboard</Link>
                      </li>
                      <li className='nav-item'>
                        <Link className="nav-link text-white" to='/dashboard/profile'>Profile</Link>
                      </li>
                      
                      <li class="nav-item accordion" id="postItem">
                          <a href="#" class="nav-link text-white accordion-button " data-bs-toggle="collapse" data-bs-target="#collapsePosts" aria-expanded="false" aria-controls="collapsePosts">
                              My Ads
                          </a>
                          <div id="collapsePosts" class="accordion-collapse collapse " >
                            
                              <ul class="nav nav-pills flex-column my-3">
                                <li className='nav-item'>
                                  <a href="/ads" class="nav-link text-white" aria-current="page">Ads</a>
                                </li>
                                <li className='nav-item'>
                                  <a href="/ads/create" class="nav-link text-white" aria-current="page">Create</a>
                                </li>
                                
                                
                              </ul>
                          
                          </div>
                      </li>
                      
            </ul>
        </div>
    </Col>
        
        

    
    </>
  )
}
