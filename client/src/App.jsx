import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'

const App = () => {
  return (
    <div className="app-root min-h-screen relative text-white overflow-hidden">
      {/* Animated background layers */}
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <div className="floating-orbs absolute inset-0 -z-5"></div>
      
      {/* Content overlay */}
      <div className="bg-overlay absolute inset-0 -z-1 pointer-events-none"></div>

      {/* App content */}
      <div className="relative z-10">
        <Routes>
          <Route path='/' element = {<Navigate to="/login"/>}/>
          <Route path='/home' element = {<HomePage/>}/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/profile' element = {<ProfilePage/>}/>
          <Route path='/signup' element = {<SignupPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App