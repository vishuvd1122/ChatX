import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils'; 

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required!");
    }

    try {
      const url = "http://localhost:6969/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess("Account Created! Please Login now.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else { // Simplified the else-if
        handleError(message);
      }
    } catch (error) {
      handleError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gray-900 bg-gradient-to-br from-gray-900 via-slate-800 to-black'>
      <div className='w-[90%] sm:w-[450px] p-8 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
            Create Your Account
          </h1>
          <p className='text-gray-400 mt-2 text-sm'>Join us and start your journey.</p>
        </div>
        
        <form onSubmit={handleSignup} className='flex flex-col gap-5'>
          <input
            type="text"
            placeholder='Enter your name..'
            className='w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder='Email'
            className='w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder='Password'
            className='w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
          />
          <button 
            type='submit' 
            className='w-full py-3 mt-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 ease-in-out'
          >
            Sign Up
          </button>
        </form>
        
        <p className='text-center text-sm text-gray-400 mt-8'>
          Already have an account?{' '}
          <Link to="/login" className='font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200'>
            Log In
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;