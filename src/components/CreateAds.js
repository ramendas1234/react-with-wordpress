import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios';

import { Navigate, Link } from 'react-router-dom';
// redux stuff
import { connect } from 'react-redux'
import { fetchCategories,createPost, isUserLoggedIn } from '../redux'

import RUG from 'react-upload-gallery'


import Navbar from './Navbar'
// bootstrap stuff
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from './Button'
// multi select
import Multiselect from 'multiselect-react-dropdown';
// alert
import swal from 'sweetalert';

import DashboardNavigation from './DashboardNavigation'


// Add style manually
import 'react-upload-gallery/dist/style.css' // or scss
import './css/dashboard.css'

const CreateAds = (props) =>  {
  const { uiData, postData, userData,isUserLoggedIn, submitPost, fetchCategories } = props
  let initialData = {
    title:'',
    content:'',
    categories:[],
    selectedCategories:[],
    btn_loading:false,
    gallery:[
      /*{
        name: "Item 1",
        size: "232kb",
        source:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4050&q=80"
      },
      {
        name: "Item 2",
        size: "23kb",
        source:
          "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80"
      },
      {
        name: "Item 3",
        size: "222kb",
        source:
          "https://images.unsplash.com/photo-1541837283948-d4242eda4585?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1835&q=80"
      }*/

    ]

  }
  const [ads, setAds] = useState(initialData);
  const [alert, setAlert] = useState({type: 'error',text: '',show: false});
  const [validated, setValidated] = useState(false);


  useEffect(() => {
       
    fetchCategories()
  },[])

 useEffect(() => {
  if(postData.categories.length>0){
    let categoriesData = postData.categories.map(function(item){
      return { id: item.id, name: item.name };
    })
    setAds({
      ... ads,
      categories: categoriesData
    })
  }     
  

},[postData.categories]) 

useEffect(() => {
  if( postData.message!='' ){
    if(postData.flag){
      swal("Success!", postData.message, "success");
    }else{
      swal("Oops!", postData.message, "error");
    }
    
  }
  

},[postData.message]) 



 const onSelectCategories = (selectedList, selectedItem) => {
    //console.log(selectedList);
    //console.log(selectedItem);
    setAds({
      ... ads,
      selectedCategories: selectedList
    })
 }

 const onRemoveCategories = (selectedList, removedItem) => {
    setAds({
      ... ads,
      selectedCategories: selectedList
    })
 }

  const handleChange = (e) => {
    setAds({
        ... ads,
        [e.target.name] : e.target.value
        
    })
  }

  const onCloseAlert = () =>  {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append( 'title', ads.title );
    formData.append( 'content', ads.content );
    formData.append( 'categories', ads.selectedCategories.map(item => item.id) );
    /*let adsData = {
      title: ads.title,
      content: ads.content,
      categories: ads.selectedCategories.map(item => item.id)
    }*/
    if(ads.gallery.length > 0){
      var gallery = ads.gallery.map((item, index ) => item.file)
      
      for(var i=0;i<gallery.length;i++){
        formData.append("gallery[]", gallery[i]);
      }
      
    }
    submitPost(formData)
    
  }

  
  

  return (
    <>

      
      <Navbar />
      <Container fluid className='height-100'>
        <Row className='height-100'>
        <DashboardNavigation/> 
          <Col md={10}>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <div className='create-ads-form-wrapper my-5'>
                <Form onSubmit={handleSubmit}>
                <Row>
                <h2 className='mb-5'>Post Your Ad</h2>
                </Row>
                <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Ads Title"
                      name='title'
                      value={ads.title}
                      onChange={handleChange}
                    />
                    {/* <Form.Control.Feedback type="invalid">{register.errors.first_name}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="validationCustom02">
                    <Form.Control
                      required
                      as="textarea" rows="3"
                      name="content"
                      placeholder="Ads Description"
                      value={ads.content}
                      onChange={handleChange}
                    />
                    {/* <Form.Control.Feedback type="invalid">{register.errors.first_name}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="validationCustom03">
                  <Multiselect
                    options={ads.categories} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                    onSelect={onSelectCategories}
                    selectedValues={ads.selectedCategories}
                    onRemove={onRemoveCategories}
                    placeholder='Select Ads Categories'
                    
                  />
                    {/* <Form.Control.Feedback type="invalid">{register.errors.first_name}</Form.Control.Feedback> */}
                </Form.Group>
                
                <RUG initialState={ads.gallery}
                sorting={false}
                autoUpload={false}
                onChange={(images) => {
                  setAds({... ads, gallery:images })
                }}

                />
                  {/* <Row>
                    <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" name="address"  />
                    </Form.Group>
                    </Col>
                  </Row> */}
                  <Button type="submit"  btnClassName="btn btn-primary" loading={uiData.btn_loading} >Create Ad</Button>
                </Form>
              </div>
            </Col>
            <Col></Col>
            </Row>
          </Col>
          
        </Row>
      </Container>
      
    </>
    
  )
}


const mapStateToProps = (store) => {
  return {
    uiData: store.ui,
    postData: store.post,
    userData: store.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      isUserLoggedIn: () => {
          dispatch(isUserLoggedIn())
      },
      fetchCategories: () => {
          dispatch(fetchCategories())
      },

      submitPost: (postData) => {
        dispatch(createPost(postData))
    },
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAds)
