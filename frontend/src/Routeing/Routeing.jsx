import React from 'react'
import { Route,Routes } from 'react-router-dom'

// --------------User Panel-----------
import HomeScreen from '../components/Users/Screens/HomeScreen'
import LoginScreen from '../components/Users/Screens/LoginScreen'
import RegisterScreen from '../components/Users/Screens/RegisterScreen'
import OTPScreen from '../components/Users/Screens/OTPScreen'
import { ForgetScreenPassword } from '../components/Users/Screens/ForgetScreenPassword'
import ResetPassword from '../components/Users/Screens/ResetPasswordScreen'


// --------------Sellers Panel-----------





// --------------Admin  Panel-----------


const Routeing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/forget' element={<ForgetScreenPassword/>}/>
        <Route path='/OTP' element={<OTPScreen/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>


{/* -----------Seller Routes---------- */}
        <Route path='/sellers' element={<HomeScreen/>}/>
        <Route path='/sellers/login' element={<LoginScreen/>}/>
        <Route path='/sellers/register' element={<RegisterScreen/>}/>
        <Route path='/sellers/forget' element={<ForgetScreenPassword/>}/>
        <Route path='/sellers/OTP' element={<OTPScreen/>}/>
        <Route path='/sellers/resetPassword' element={<ResetPassword/>}/>

{/* ------------Admin Panel--------- */}

    </Routes>
  )
}

export default Routeing