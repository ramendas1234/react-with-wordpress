import React from 'react'
import { Navigate, Link } from 'react-router-dom';

import { isUserLoggedIn, getUserData } from './actions/actions'

import Navbar from './Navbar'
import DashboardNavigation from './DashboardNavigation'
import Footer from './Footer'
import './css/dashboard.css'

export default function Dashboard() {
    if (!isUserLoggedIn()) {
        return <Navigate to='/login'/>;
      }
    let userData = getUserData();
  return (
    <>
        <Navbar />
        {/* <div className='container'>
            Welcome { userData.user_display_name }
        </div> */}
        <div class="container-fluid display-table">
          <div class="row">
              <div class="col-md-2 col-sm-1 p-3 text-white bg-dark" id="dashboard-navigation">
                  
                  
              <DashboardNavigation />


              </div>
              <div class="col-md-10 col-sm-11 display-table-cell v-align" style={{height: "100vh"}}>
                  
                  <div class="user-dashboard py-5">
                      
                      <div class="row">

                      
                          <div class="offset-md-3 col-md-4 col-sm-5 col-xs-12 gutter">
                          
                              <h2>Welcome dashboard</h2>
                              
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>

      </div>
    
    </>
  )
}
