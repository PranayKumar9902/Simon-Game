import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {BASE_URL } from '../../helper.js';
import "./register.css";

export default function Register() {
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();
  const navigate=useNavigate();
const handleUsername=(e)=>{
  
   setUsername(e.target.value);
}
const handlePassword=(e)=>{
  setPassword(e.target.value);
}
const getRegistered=async ()=>{
  try{
    
     const response=await axios.post(`${BASE_URL}/register`,{username,password});
     alert("Successfully registered");
     GotoLogin();
  }
  catch(err){
    console.log("Error: ",err);
  }
}
const GotoLogin=()=>{
  
    navigate('/');
}



  return (
    <div>
      <div className="registerForm">
        <h1>SIGN IN</h1>
        <input type="text" className="username" placeholder='Username' onChange={(e)=>handleUsername(e)} />
        <input type="password" className="password" placeholder='Password' onChange={(e)=>handlePassword(e)} />
        <button className="submit" onClick={getRegistered}>REGISTER</button>
      </div>
      <div className="login">
        <span>Already have an account?</span>
        <button className="login" onClick={GotoLogin}>SIGN UP</button>
      </div>
    </div>
  )
}
