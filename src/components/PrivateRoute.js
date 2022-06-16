import React from 'react'
import { Route, Redirect } from 'react-router-dom';


// const PrivateRoute = (props) => {
    

// }

function PrivateRoute(props){
  const { component: Component,authenticated, ...rest } = props

    return (
        <Route {...rest} render={props => {
            if (!authenticated) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute