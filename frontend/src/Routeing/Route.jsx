import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App.jsx';

const routing = (
  <Routes>
    <Route path="/" element={<App />} />
  </Routes>
);

export default routing;
