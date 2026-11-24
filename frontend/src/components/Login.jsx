import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alerts/AlertContext";

const Login = () => {
  const context = useContext(AlertContext);
  const {Alerts} = context;
  const [credentials,setCredentials] = useState({email:"",password:""});
  const navigate = useNavigate();
    const handleSubmit = async(e)=>{
      e.preventDefault();
     const response = await fetch("http://localhost:3000/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
         body: JSON.stringify({ email:credentials.email,password:credentials.password }),
     });
     const json = await response.json();
     console.log(json);
     if(json.success){
      //save the auth token and redirect.
       localStorage.setItem('token',json.authToken);
       Alerts("Logged in successfully", "success");
      navigate('/');
     }else{
     Alerts("Invalid credentials", "error");
     }
    }
    const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg border w-full max-w-sm">
        <h2 className="font-bold text-2xl text-center mb-2">Welcome Back!</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Sign in to your account to continue managing your projects and tasks.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email Address
            </label>
            <input type="email" placeholder="Enter your Email address"
              id="email" name="email" value={credentials.email} onChange={onChange}
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>
            <input type="password" placeholder="Enter your password" id="password" name="password" value={credentials.password} onChange={onChange}
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className=" bg-blue-500 transition-all duration-200 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold py-2.5 rounded-lg w-full" >
            Login
          </button>
        </form>
          <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?
          <a href="/signup" className="text-blue-600 font-semibold ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
