import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AlertContext from "../context/alerts/AlertContext";

const Signup = () => {
   const context = useContext(AlertContext);
  const {Alerts} = context;
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
  const signupButton = async(e)=>{
      e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
    alert("Passwords do not match");
    return;
  }
     const response = await fetch("http://localhost:3000/api/auth/signup",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
         body: JSON.stringify({ name:credentials.name,email:credentials.email,password:credentials.password, cpassword:credentials.cpassword}),
     });
     const json = await response.json();
     console.log(json);
     if(json.success){
      //save the auth token and redirect.
       localStorage.setItem('token',json.authToken);
         Alerts("Account Created successfully", "success");
      navigate('/login');
     }else{
      Alerts("Invalid credentials","error");
     }
    }
     const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-5 flex flex-col items-center justify-center px-4">
       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 w-full max-w-md">
      <h2 className="font-bold text-2xl text-center mb-2">Create Your Account</h2>
      <p className="text-sm text-cyan-900 text-center mb-3">
        Sign up to start managing your projects and tasks with ProTask.
        </p>
      <form className="flex flex-col gap-2" onSubmit={signupButton}>
       <div className="flex flex-col gap-2">
       <label htmlFor="name" className="font-medium text-gray-700">Name</label>
       <input type="text" placeholder="Enter your full name" id="name" name="name" value={credentials.name} onChange={onChange} className="py-3 px-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"   required/>
       </div>
       <div className="flex flex-col gap-2">
       <label htmlFor="email" className="font-medium text-gray-700">Email</label>
       <input type="email" placeholder="Enter your email address" id="email" name="email" value={credentials.email} onChange={onChange}  className="py-3 px-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"  required/>
       </div>
        <div className="flex flex-col gap-2">
       <label htmlFor="password" className="font-medium text-gray-700">Password</label>
       <input type="password" placeholder="Enter your password" id="password" name="password" value={credentials.password} onChange={onChange}  className="py-3 px-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" minLength={8} required/>
       </div>
        <div className="flex flex-col gap-2">
       <label htmlFor="cpassword" className="font-medium text-gray-700">Confirm Password</label>
       <input type="password" placeholder="Confirm your password" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange}  className="py-3 px-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" required/>
       </div>
       <button type="submit" className="text-white bg-violet-600 hover:bg-violet-700 hover:cursor-pointer transition-all py-2.5 rounded-lg font-semibold">Create account</button>
       <p className="text-sm text-center text-gray-600">Already have an account? 
     <a href="/login" className="text-blue-500 font-medium hover:underline ml-1">Login</a>
       </p>
      </form>
      </div>
    </div>
  )
}


export default Signup