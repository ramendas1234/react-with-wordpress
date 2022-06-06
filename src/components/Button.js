import React from 'react'
import { sanitize } from 'dompurify';

function Button({ children, style, onClick, btnClassName, loading }) {
    
  return (
    <>
    {loading ? <button className={btnClassName} style={style} type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button> : <button type="submit" className={btnClassName} style={style}>{children}</button>}
    </>
    
    
  )
}

export default Button