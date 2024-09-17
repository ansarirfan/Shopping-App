import React, { useEffect, useState } from 'react'
import './Listproducts.css'
import cross_icon from '../../assets/cross_icon.png'

const Listproducts = () => {
  const url = "https://shopping-app-backebd.onrender.com";
  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch(`${url}/allproducts`)
    .then((res)=>res.json())
    .then((data)=>{setAllproducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  //for remove product
  const removeProduct = async (id)=>{
    await fetch(`${url}/deleteproduct`',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',

      },
      body:JSON.stringify({id:id}),
    }).then((resp)=>resp.json()).then((data)=>{
      data.success?alert("Product deleted"):alert("failed")
    })

    await fetchInfo();
  }
  
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
       <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Removed</p>
       </div>

       <div className="listproduct-allproducts">
        <hr />
       {
        allproducts.map((product, index)=>{
          return<>
           <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
         </div>
          <hr />
          </>
        })}
       </div>
    </div>
  )
}

export default Listproducts
