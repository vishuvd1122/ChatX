import assets from '../assets/assets' // <-- Add this line
import React, { useState } from 'react'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Signup")
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);



  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* -------- left -------- */}
      <img src={assets.logo_big} alt="logo" className="w-[180px] sm:w-[240px]" />

      {/* -------- right -------- */}
      <form action="" className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex justify-between items-center">{currState}
          <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" />
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (<input onChange={(e) => setFullName(e.target.value)}
          value={fullName} type="text" className="p-2 border border-gray-500 rounded-md focus:outline-none"
          placeholder="Full Name" required />)}

        {isDataSubmitted && (
          <>

             <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}


      </form>
    </div>
  )
}

export default LoginPage