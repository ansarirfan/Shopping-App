import React, { useState } from 'react'
import './Addproducts.css'
import upload_area from '../../assets/upload_area.svg'

const Addproducts = () => {

  const [image, setImage] = useState(false);
  const [productDetail, setProductDetail] = useState({
    name:" ",
    image:" ",
    category:"women",
    new_price: " ",
    old_price:" "
  })
  const imageHndler = (e) =>{
     setImage(e.target.files[0])
  }

  const changeHndler = (e) =>{
    setProductDetail({...productDetail, [e.target.name]:e.target.value})
 }
 
 const addProduct = async ()=>{
    console.log(productDetail)
    // store image in backend
    let responseData;
    let product = productDetail;
    let formData = new FormData()
    formData.append('product', image);
      await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
            accept: 'application/json',

        },
        body:formData,
      }).then((resp)=>resp.json()).then((data)=>{responseData= data})

      if(responseData.success){
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("failed")
      })

      }
 }
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Tittle</p>
            <input value={productDetail.name} onChange={changeHndler} type="text" name='name' placeholder='type your name here !' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetail.old_price} onChange={changeHndler} type="text" name='old_price' placeholder='type here !' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetail.new_price} onChange={changeHndler} type="text" name='new_price' placeholder='type here !' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetail.category} onChange={changeHndler} name="category" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image? URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHndler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{addProduct()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproducts
