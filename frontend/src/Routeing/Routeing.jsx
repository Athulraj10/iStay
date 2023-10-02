import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomeScreen from '../components/Screens/HomeScreen'
import LoginScreen from '../components/Screens/LoginScreen'
import RegisterScreen from '../components/Screens/RegisterScreen'
import ForgetPassword from '../components/ForgetPassword/ForgetPassword'




const Routeing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/forget' element={<ForgetPassword/>}/>
    </Routes>
  )
}

export default Routeing