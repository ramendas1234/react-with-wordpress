import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux'

import { logoutUser } from '../redux'

function Logout(props) {

  const { userData,logoutUser } = props

  useEffect(() => {
    logoutUser();
  
  }, []);
    
    if (!userData.authenticated) {
        return <Navigate to='/login'/>;
      }else{
        return '';
      }

    
}


const mapStateToProps = (store) => {
  return {
      userData: store.user
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout)
