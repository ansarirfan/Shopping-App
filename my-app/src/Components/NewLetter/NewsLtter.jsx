import React from 'react'
import "./NewsLetter.css"
const NewsLtter = () => {
  return (
    <div className='newsLetter'>
        <h1>Get exclusive Offers on your email</h1>
        <p>Subscribe our NewsLetter and stay update</p>
        <div>
            <input type="email" placeholder='type your email' />
            <button>Subscribe</button>
        </div>

    </div>
   
  )
}

export default NewsLtter