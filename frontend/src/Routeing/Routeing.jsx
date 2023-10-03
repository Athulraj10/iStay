import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomeScreen from '../components/Users/Screens/HomeScreen'
import LoginScreen from '../components/Users/Screens/LoginScreen'
import RegisterScreen from '../components/Users/Screens/RegisterScreen'
import OTPScreen from '../components/Users/Screens/OTPScreen'
import { ForgetScreenPassword } from '../components/Users/Screens/ForgetScreenPassword'
import ResetPassword from '../components/Users/Screens/ResetPasswordScreen'



const Routeing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/forget' element={<ForgetScreenPassword/>}/>
        <Route path='/OTP' element={<OTPScreen/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
    
    </Routes>
  )
}

export default Routeing