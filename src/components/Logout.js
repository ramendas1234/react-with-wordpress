import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

import { isUserLoggedIn, logoutUser } from './actions/actions'

function Logout() {
    logoutUser();
    if (!isUserLoggedIn()) {
        return <Navigate to='/login'/>;
      }

    
}

export default Logout
