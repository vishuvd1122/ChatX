import React, { useState } from 'react'
import { ToastContainer } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { handleError, handleSuccess } from '../utils'

const Signup = () => {

  const [SignupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  //Taking the hold of the user entered value.
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value);
    const copySignupInfo = { ...SignupInfo }
    copySignupInfo[name] = value
    setSignupInfo(copySignupInfo)
  }

  console.log("Login Info-->", SignupInfo);


  //Making the API call
  const handleSignup = async(e) => {
    e.preventDefault();
    const {name , email , password} = SignupInfo
    if(!name || !email ||!password){
      return handleError("Name, email and password are required!")
    }

    try {
      const url = "http://localhost:6969/auth/signup"
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(SignupInfo)
      })
      const result = await response.json()
      console.log(result);
      const {success , message } = result;
      if(success){
        handleSuccess(message)
        setTimeout(() => {
          navigate("/login")
        }, 1000);
      }
       else if(!success){
        handleError(message)
        }     
    } catch (error) {
      handleError();
    }

  }


  
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>

      {/* Card container */}
      <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>

        {/* Form section */}
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <h1 className='mb-3 text-4xl font-bold'>SignUp</h1>
          <span className='font-light text-gray-700 mb-8'>
            Create your account to get started!
          </span>

          <form onSubmit={handleSignup} className='flex flex-col gap-y-4'>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className='mb-2 text-md font-medium text-gray-700'>Name</label>
              <input
                onChange={handleChange}
                type="text"
                name='name'
                autoFocus
                placeholder='Enter your name..'
                value={SignupInfo.name}
               className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className='mb-2 text-md font-medium text-gray-700'>Email</label>
              <input
                onChange={handleChange}
                type="email"
                name='email'
                placeholder='Enter your email..'
                value={SignupInfo.email}
                className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className='mb-2 text-md font-medium text-gray-700'>Password</label>
              <input
                onChange={handleChange}
                type="password"
                name='password'
                placeholder='Enter your password..'
                value={SignupInfo.password}
                className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Signup Button */}
            <button className='w-full bg-blue-600 text-white p-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors'>
              Signup
            </button>

            {/* Link to Login Page */}
            <div className='text-center mt-4 text-gray-600'>
              Already have an account?{' '}
              <Link to="/login" className='text-blue-600 font-medium hover:underline'>
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Image section */}
        <div className='relative hidden md:block'>
          <img
            src="https://via.placeholder.com/400x500.png?text=Create+Account"
            alt="Illustration for account creation"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup;
