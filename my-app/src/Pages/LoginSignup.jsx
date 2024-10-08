import React, {useState} from "react"
import "./CSS/LoginSignup.css"


const LoginSignup = () => {
  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username:"",
    password: "",
    email: ""
    })

  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
    
  // for login
  const login = async ()=>{
  console.log("login", formData);
  let responseData;
     await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',

      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>{responseData=data}) 
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors)
    }
  }
     // sin up
  const signup = async ()=>{
     console.log("sign in", formData);
     let responseData;
     await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',

      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>{responseData=data}) 
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors)
    }
  }


  return (
    <div className='loginSignup'>
      <div className="auth-container">
        <h1>{state}</h1>
        <div className="auth-field">
          {state === "Sign Up"?<input name="username" value={formData.username}  onChange={changeHandler} type="text" placeholder='Your Name' />: <> </>}
          
          <input name="email" value={formData.email}  onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name="password" value={formData.password}  onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state === "Login"?login():signup()}}>Continue</button>
        {state === "Sign Up"?<p className='have-registered'>Already have account? <span onClick={()=>{setState("Login")}} >Login here</span> </p>
                             : <p className='have-registered'>Create an a account? <span onClick={()=>{setState("Sign Up")}} >Click here</span> </p>}
        
       <div className="auth-agree">
          <input type="checkbox" id='' name='' />
          <p>By continue , i agree to the term of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup