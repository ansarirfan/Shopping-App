import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
      <div className="descriptionBox-navigator">
        <div className="descriptionBox-nav-box">Description</div>
        <div className="descriptionBox-nav-box fade">Reviews (125)</div>
      </div>
      <div className="descriptionBox-description">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam commodi ducimus voluptatibus inventore! Minus distinctio quos
           quia maiores ad enim optio illo? Culpa vitae labore corporis et minus, sapiente velit.
           Quam commodi ducimus voluptatibus inventore! Minus distinctio.</p>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolor hic natus nam, esse ratione sapiente ex id ab nostrum error 
             nulla repellat officiis, odio beatae molestiae suscipit assumenda tempora saepe quidem quia, doloremque adipisci ipsam. 
             Repellendus, eaque quos!</p>
      </div>
    </div>
  )
}

export default DescriptionBox
