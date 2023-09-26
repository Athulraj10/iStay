// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,RouterProvider} from 'react-router-dom'
// import './index.css'
// import HomeScreen from './screen/HomeScreen/HomeScreen.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={ <App/> }>
//       <Route index={true} path='/' element={ <HomeScreen /> }/>
//     </Route>
//   )
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router}/>
//   </React.StrictMode>,
// )
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import HomeScreen from './screen/HomeScreen/HomeScreen.jsx';

// Define your routing configuration using the Routes component
const routing = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
    </Route>
  </Routes>
);

// Create a single BrowserRouter component to handle routing
const AppWithRouter = (
  <BrowserRouter>
    {routing}
  </BrowserRouter>
);

// Render the application inside the root element of the HTML document
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {AppWithRouter}
  </React.StrictMode>
);
