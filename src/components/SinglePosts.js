import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import redux data
import { connect } from 'react-redux'
import { fetchPostDetail } from '../redux'; 

import { sanitize } from 'dompurify';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import Navbar from './Navbar'
import Footer from './Footer'
import Loader from './Loader'

function SinglePosts(props) {
  let { id } = useParams();
  
  const { uiData, postData, fetchPostDetail } = props
  const { message,post_details } = postData
  useEffect(() => {
    fetchPostDetail(id)
  }, [])

  
  
  
  
  return (
    <>
      <Navbar/>
      {message && <div className='alert alert-danger'>{message}</div>}
      <div className='container'>
        {uiData.page_loading && <Loader /> }
        {Object.keys(post_details).length != 0 && (
          
          <div className='row'>
            <div className='col-sm-12'>
            <div  class="card border-primary m-3" >
              <div class="card-header"><h4 class="card-title">{post_details.title.rendered}</h4><p>{moment(post_details.date).fromNow()}</p></div>
              <div class="card-body">
                  <img className='banner mb-5' src={post_details.thumbnail_url} />
                  <p class="card-text" dangerouslySetInnerHTML={{ __html: sanitize(post_details.content.rendered) }} />
                  {/* <p class="card-text" >{post.content.rendered}</p> */}
              </div>
              <div className='card-footer'>
                    <p>{moment(post_details.date).fromNow()}</p>
              </div>
            </div>
            </div>
          </div>
          


        ) }
        
        {uiData.page_loading}
      </div>
      <Footer/>
    </>
    
  )
}

const mapStateToProps = (store) => {
  return {
      uiData: store.ui,
      postData: store.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetail: (id) => {
          dispatch(fetchPostDetail(id))
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SinglePosts)