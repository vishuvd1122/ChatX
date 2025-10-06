import assets from '../assets/assets'; // Make sure the path to your assets is correct
import { HiInformationCircle } from 'react-icons/hi';
import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils'; // Assuming this file exists and works

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required!");
    }

    try {
      const url = "http://localhost:6969/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred during login.");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gray-900 bg-gradient-to-br from-gray-900 via-slate-800 to-black'>
      <div className='w-[90%] sm:w-[450px] p-8 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-2xl flex flex-col items-center'>
        <div className='text-center w-full mb-6'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
            Welcome Back
          </h1>
          <p className='text-gray-400 mt-2 text-sm'>Login to continue your journey.</p>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col gap-5 w-full'>
          <input
            type="email"
            placeholder='Email'
            className='w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder='Password'
            className='w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='w-full py-3 mt-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 ease-in-out'
          >
            Log In
          </button>
          <div className='mt-8 w-full p-4 bg-sky-900/30 border border-sky-800 rounded-lg flex gap-3 items-start'>
            <div>
              <HiInformationCircle className="h-6 w-6 text-sky-400" />
            </div>
            <div className="text-sm">
              <p className="text-sky-200 leading-relaxed">
                <span className='font-semibold text-white'>Email:</span> test1@gmail.com
              </p>
              <p className="text-sky-200 leading-relaxed">
                <span className='font-semibold text-white'>Password:</span> Vishu@123
              </p>
            </div>
          </div>
        </form>

        <p className='text-center text-sm text-gray-400 mt-8'>
          Don't have an account?{' '}
          <Link to="/signup" className='font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200'>
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;