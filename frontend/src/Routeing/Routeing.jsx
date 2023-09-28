import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomeScreen from '../components/Screens/HomeScreen'
import LoginScreen from '../components/Screens/LoginScreen'
import RegisterScreen from '../components/Screens/RegisterScreen'




const Routeing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
    </Routes>
  )
}

export default Routeing