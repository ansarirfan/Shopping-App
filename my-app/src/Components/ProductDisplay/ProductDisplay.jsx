import React, { useContext } from 'react'
import "./ProductDisplay.css"
import star_icon from "../Assets/star_icon.png"
import dull_icon from "../Assets/star_dull_icon.png"  
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => { 
    const {product} = props;
    const {addToCart} = useContext(ShopContext)


  return (
    <div className='productDisplay'>
        <div className="productDisplay-left">
            <div className="pdimg-list">
                <img src={product.image} alt=""/>
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="pdimg">
                <img className='pd-main-img' src={product.image} alt="" />
            </div>
        </div>
     <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="pd-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={dull_icon} alt="" />
            <p>(110)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">${product.old_price}</div>
            <div className="productdisplay-right-prices-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            A lightweight, usually knighted pullover shirt, close-fitting and with a round neckline and short sleevs, worn as a undershirt or outrer garment.
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category"> <span>Category :</span> Women, T-Shirt, Crop, Top </p>
        <p className="productdisplay-right-category"> <span>Tags :</span> Modern, Lattest </p>
     </div>
    </div>
  )
}

export default ProductDisplay