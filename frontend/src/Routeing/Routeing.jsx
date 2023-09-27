import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomeScreen from '../components/Screens/HomeScreen'

const Routeing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>}/>
    </Routes>
  )
}

export default Routeing