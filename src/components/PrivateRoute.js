import React, {useEffect} from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Loader from './Loader';
import CreateAds from './CreateAds';


import { loginUser, isUserLoggedIn } from '../redux'

// const PrivateRoute = (props) => {
    

// }

// function PrivateRoute(props){
//   const { component: Component,authenticated, ...rest } = props
//     console.log('vhgvghvc');
//     return (
//         <Route path="/ads/create" element={<CreateAds />} />
//     );
// }

function PrivateRoute({ children, userData,uiData }) {
    
    if(uiData.page_loading){
        return <Loader />;
    }else{
        return userData.authenticated === true ? children : <Navigate to="/login" replace />;
    }

    
    
  }

const mapStateToProps = (store) => ({
    uiData: store.ui,
    userData: store.user
})

const mapDispatchToProps = (dispatch) =>{
    return {
        isUserLoggedIn: () => {
            dispatch(isUserLoggedIn())
        }
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute)