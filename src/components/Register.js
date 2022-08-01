import React, {useState, useEffect} from 'react'


import axios  from 'axios'
// redux stuff
import { connect } from 'react-redux'
import { registerUser,isUserLoggedIn } from '../redux'
import { Navigate } from 'react-router-dom';

import { SITE_URL } from './constant/constant'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
//import Button from 'react-bootstrap/Button'
import Button from './Button'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from './Loader';


// import { isUserLoggedIn, getUserData } from './actions/actions'

function Register(props) {
  const { uiData, userData, registerUser, isUserLoggedIn } = props;
  
  

  let registredInitial = {
    data:{
      first_name:'',
      last_name:'',
      username:'',
      email:'',
      password:'',
      confirm_password:'',
      terms_condition:false,
    },
    errors:{
      first_name:'Enter First Name',
      last_name:'Enter Last Name',
      username:'Enter Username',
      email:'Enter Email',
      password:'Type Password',
      confirm_password:'Type ConfirmPassword',
      terms_condition:'You must agree before submitting.',
    },
}

  const [register, setRegister] = useState(registredInitial);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setRegister({
        ... register,
        data: {
          ... register.data ,
          [e.target.name] : e.target.value
        }
        
    })
  }

  
  const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
      }else{
        const { data:{ first_name,last_name,username,email,password,confirm_password } } = register
        let postData = {
          first_name,last_name,username,email,password,confirm_password
        }
        registerUser(postData);

      }

      
  }

 
  let alertClass = (userData.success_msg.length>0)?'success':'danger'
  
  if(uiData.page_loading){
      return <Loader />;
  }else{
      return userData.authenticated === true ? <Navigate to="/dashboard" replace />
      : (

        <>
          <Navbar />
          <Container>
          <Row className="justify-content-md-center">
              
          
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="my-5">
                <Col  md={{ span: 4, offset: 4 }}>
                  <h3 className='my-3'>Register Your Account</h3>
                  {userData.success_msg.length>0 &&  (
                    <Alert  variant={alertClass}>
                      {userData.success_msg}
                    </Alert>
                  ) }

                  {userData.error.length>0 &&  (
                    <Alert  variant={alertClass}>
                      {userData.error}
                    </Alert>
                  ) }
                  
                  
                  <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
                        <Form.Control
                          required
                          type="text"
                          placeholder="First name"
                          name='first_name'
                          value={register.data.first_name}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">{register.errors.first_name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="validationCustom02">
                  
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        name='last_name'
                        value={register.data.last_name}
                        onChange={handleChange}
                      />
                    <Form.Control.Feedback type="invalid">{register.errors.last_name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3"  controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                        name='username'
                        value={register.data.username}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                      {register.errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3" controlId="validationCustom03">
                    <Form.Control type="email" placeholder="email" required name='email'
                        value={register.data.email}
                        onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                    {register.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3" >
                    <Form.Control type="text" placeholder="password" required name='password'
                        value={register.data.password}
                        onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                    {register.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3" >
                    <Form.Control type="text" placeholder="confirm password" required name='confirm_password'
                        value={register.data.confirm_password}
                        onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                    {register.errors.confirm_password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    name='terms_condition'
                    value={register.data.terms_condition}
                    onChange={handleChange}
                    feedback={register.errors.terms_condition}
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button type="submit"  btnClassName="btn btn-primary" loading={userData.btn_loading} >Register</Button>
                </Col>
                  
              </Row>


            </Form>
          
          
          
          
          
          
          </Row>
          
        </Container>
        <Footer />
        </>

      )
    }
}

const mapStateToProps = (store) => {
  return {
      uiData: store.ui,
      userData: store.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    registerUser : (postData) => {
          dispatch(registerUser(postData))
      },
      isUserLoggedIn: () => {
          dispatch(isUserLoggedIn())
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)