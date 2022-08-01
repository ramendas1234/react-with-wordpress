import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { isUserLoggedIn } from './actions/actions'
import { logoutUser } from '../redux'

function Navbar({userData}) {
  return (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<div className="container-fluid">
			
			<div className="collapse navbar-collapse" id="navbarColor01">
			<ul className="navbar-nav me-auto">
				
				<li className="nav-item">
					<Link className="nav-link active" to='/'>Home</Link>
				</li>
				

				{!userData.authenticated
					? <>
					<li className="nav-item">
					<Link className="nav-link " to='/login'>Login</Link>
					</li>
					<li className="nav-item">
					<Link className="nav-link " to='/register'>Register</Link>
					</li>
					</>
					: <>
					<li className="nav-item">
					<Link className="nav-link " to='/dashboard'>Dashboard</Link>
					</li>
					<li className="nav-item">
					<Link className="nav-link " to='/logout'>Logout</Link>
					</li>
					</>
				}


				
			</ul>
			
			</div>
		</div>
	</nav>
  )
}

const mapStateToProps = (store) => ({
	userData: store.user
})

const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: () => {
			dispatch(logoutUser())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)