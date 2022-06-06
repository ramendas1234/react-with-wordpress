import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom';

import axios  from 'axios'
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

import { isUserLoggedIn, getUserData } from './actions/actions'

function Register() {

  if (isUserLoggedIn()) {
    return <Navigate to='/dashboard'/>;
  }

  let registredInitial = {
    loading: false,
    
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
    api_response_msg:'',
    registration_success:false

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
        setRegister({... register, loading:true})
        const { data:{ first_name,last_name,username,email,password,confirm_password } } = register
        let postData = {
          first_name,last_name,username,email,password,confirm_password
        }

        axios.post(`${SITE_URL}wp-json/wp/v2/users/register`, postData)
        .then(response => {
          if(response.data.code==200){
            setRegister({... register, loading:false, api_response_msg:response.data.message,registration_success:true})
            setTimeout(function(){
              //return <Navigate to='/login'/>
              window.location.href='/login'
            },2000)
          }
            


        })
        .catch(error => {
          const {message, data:{error_field}} = error.response.data
          setRegister({... register, loading:false, api_response_msg:message})
          setValidated(true);
        })

        
      }

      
  }

  let alertClass = (register.registration_success)?'success':'danger'
    
  return (

    <>
      <Navbar />
      <Container>
      <Row className="justify-content-md-center">
          
      
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="my-5">
            <Col  md={{ span: 4, offset: 4 }}>
              <h3 className='my-3'>Register Your Account</h3>
              {register.api_response_msg.length>0 &&  (
                <Alert  variant={alertClass}>
                  {register.api_response_msg}
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
            <Button type="submit"  btnClassName="btn btn-primary" loading={register.loading} >Register</Button>
            </Col>
              
          </Row>


        </Form>
      
      
      
      
      
      
      </Row>
      
    </Container>
    <Footer />
    </>
    
    
  )
}

export default Register