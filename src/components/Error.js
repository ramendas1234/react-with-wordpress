import React from 'react'
import { sanitize } from 'dompurify';

function Error(props) {
    const { msg } = props
  return (
    <div className='alert alert-danger'   dangerouslySetInnerHTML={{ __html: sanitize(msg) }} />
  )
}

export default Error