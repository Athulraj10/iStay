import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleChange=()=>{
    setCount(count+1)
  }

  return (
    <div className='app'>
      <h1 >{count}</h1>
      <button onClick={handleChange}>+</button>
    </div>
  )
}

export default App
