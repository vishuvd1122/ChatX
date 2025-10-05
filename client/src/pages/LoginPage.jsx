import React, { useState } from 'react'
import { ToastContainer } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { handleError, handleSuccess } from '../utils'

const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyLoginInfo = { ...LoginInfo }
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo
    if (!email || !password) {
      return handleError("Email and password are required!")
    }

    try {
      const url = "http://localhost:6969/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginInfo)
      })
      const result = await response.json()
      const { success, message, jwtToken, name } = result;
      if (success) {
        handleSuccess(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        setTimeout(() => {
          navigate("/home")
        }, 500);
      }
      else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError("An error occurred during login.");
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>

      {/* Card container */}
      <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>

        {/* Image section (moved to the left) */}
        {/* Note the rounded-l-2xl and rounded-r-none to adjust corners */}
        <div className='relative hidden md:block'>
          <img
            src="https://via.placeholder.com/400x500.png?text=Welcome+Back"
            alt="Illustration for login page"
            className="w-[400px] h-full hidden rounded-l-2xl rounded-r-none md:block object-cover" // Changed rounding
          />
        </div>

        {/* Form section (now on the right) */}
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <h1 className='mb-3 text-4xl font-bold'>Login</h1>
          <span className='font-light text-gray-400 mb-8'>
            Welcome back! Please log in to your account.
          </span>

          <form onSubmit={handleLogin} className='flex flex-col gap-y-4'>
            <div>
              <label htmlFor="email" className='mb-2 text-md font-medium text-gray-700'>Email</label>
              <input
                onChange={handleChange}
                type="email"
                name='email'
                autoFocus
                placeholder='Enter your email..'
                value={LoginInfo.email}
                className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label htmlFor="password" className='mb-2 text-md font-medium text-gray-700'>Password</label>
              <input
                onChange={handleChange}
                type="password"
                name='password'
                placeholder='Enter your password..'
                value={LoginInfo.password}
                className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <button type="submit" className='w-full bg-blue-600 text-white p-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors'>
              Login
            </button>

            <div className='text-center mt-4 text-gray-600'>
              Don't have an account?{' '}
              <Link to="/signup" className='text-blue-600 font-medium hover:underline'>
                Sign Up
              </Link>
            </div>
            {/* Demo Credentials Hint */}
            <div className='mt-1 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-800'>
              <p className="leading-relaxed">
                <span className='font-semibold'>Email:</span> test1@gmail.com
              </p>
              <p className="leading-relaxed">
                <span className='font-semibold'>Password:</span> Vishu@123
              </p>
            </div>
          </form>
        </div>


      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;