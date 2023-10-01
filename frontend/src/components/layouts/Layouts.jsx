// Layout.js
import React from 'react';
import backgroundImage from './bg.png'; // Import your background image

const Layout = ({ children }) => {
  return (
    <div
      className='mainContainer'
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        // background:'green',
        backgroundSize: 'cover', // Adjust the image size to cover the container
        backgroundPosition: 'center', // Center the image horizontally and vertically
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
