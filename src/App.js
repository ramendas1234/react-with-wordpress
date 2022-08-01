import React from 'react';
import { BrowserRouter,Router, Link,Switch, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'
import { pageLoadingRequest,completeRequest, isUserLoggedIn } from './redux'
import './bootstrap.min.css';
import './components/js/bootstrap.bundle.min.js'
import PrivateRoute from "./components/PrivateRoute"
import Home from './components/Home'
import SinglePosts from './components/SinglePosts'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UpdateProfile from './components/UpdateProfile'
import CreateAds from './components/CreateAds'

import jwt_decode from "jwt-decode";


store.dispatch(pageLoadingRequest())
store.dispatch(isUserLoggedIn())
setTimeout(()=>{
	store.dispatch(completeRequest())
},2000)

class App extends React.Component {
	
	render() {
		
		return (
			<BrowserRouter>
				<Provider store={store}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/post/:id" element={<SinglePosts />} />
						
						
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/dashboard" 
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
								}
						/>
						<Route path="/dashboard/profile" 
							element={
							<PrivateRoute>
								<UpdateProfile />
							</PrivateRoute>
							}  />
						{/* <Route path="/ads/create" element={<CreateAds />} /> */}
						<Route path="/logout" element={<Logout />} />
						<Route
							path="/ads/create"
							element={
							<PrivateRoute>
								<CreateAds />
							</PrivateRoute>
							}
						/>
						
						{/* <PrivateRoute exact path="/ads/create" authenticated={false} component={CreateAds} /> */}
						{/* <Route exact path="/" component={Home} />
						<Route exact path="/path/:id" component={SinglePosts} /> */}
					</Routes>
					{/* <Switch>
						<PrivateRoute exact path="/login" authenticated={false} component={Login} />
					</Switch> */}
						
				</Provider>	
				
		  	</BrowserRouter>
		);
	}
}

export default App;
