import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomeScreen from '../components/Screens/HomeScreen'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'


const Routeing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default Routeing