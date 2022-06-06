import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import { sanitize } from 'dompurify';
import { Link } from 'react-router-dom'

//import redux data
import { connect } from 'react-redux'
import { fetchPosts } from '../redux'; 

import Navbar from './Navbar';
import Footer from './Footer'
import Loader from './Loader';
function removeHTML(str){ 
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
}


function Home(props) {
  
  const { postsData, fetchPosts } = props  
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
 
  return (
    <div>
        <Navbar />
        <div className='container'>
        {postsData.loading && <Loader /> }
        
            
            {postsData.posts.length>0 ? (
            <div className='mt-5 row post-container'>
                { postsData.posts.map(post => (

                            <div key={post.id} className='col-sm-3'>
                                <div  class="card border-primary mb-3" style={{maxWidth: 20 + 'rem'}}>
                                    <div class="card-header"><h4 class="card-title"><Link to={`/post/${post.id}`}>{post.title.rendered.substring(0, 30)}</Link></h4></div>
                                    <div class="card-body" style={{minHeight: `150px`}}>
                                    {/* <h4 class="card-title">{post.title.rendered}</h4> */}
                                    {/* <p class="card-text" dangerouslySetInnerHTML={{ __html: sanitize(post.content.rendered.substring(0, 100)) }} /> */}
                                    <p class="card-text">{removeHTML(post.excerpt.rendered).substring(0, 100)}</p>
                                    </div>
                                    <div className='card-footer'>
                                        <p>{moment(post.date).fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                            

                            
                        )) }
                    </div>
                ) : ''}

            
        </div>
        <Footer />
    </div>
  )
}


const mapStateToProps = (store) => {
    return {
        postsData: store.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => {
            dispatch(fetchPosts())
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)