import React, { useEffect, useState } from 'react'
import "./NewCollection.css"
// import new_collection from "../Assets/new_collections"
import Item from "../Item/Item"

const NewCollectiopn = () => {
const url = "https://shopping-app-backebd.onrender.com";
  const [new_collection, setNew_collection] = useState([]);
  
  useEffect(()=>{
    fetch(`${url}/newCollection`)
    .then((response)=>response.json()).then((data)=>{setNew_collection(data)})
},[])

  return (
    <div className='newCollection'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
        {new_collection.map((item, i) => {
            return <Item  key={i}
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price}
            old_price={item.old_price}  />
        })}
        </div>
    </div>
  )
}

export default NewCollectiopn
