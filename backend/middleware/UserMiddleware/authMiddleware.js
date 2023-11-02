import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/UserModels/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.cookie
  .split('; ')
  .find(cookie => cookie.startsWith('user_JWT_token='))
  .split('=')[1];


  // // Check for the token in headers and cookies
  // token = req.headers.authorization || req.cookies.jwt_User;

  if (token) {
    try {
      // Verify and decode the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by their ID from the token
      const userFound = await User.findById(decodedToken.userId).select('-password');
      
      if (!userFound) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach the user information to the request for further use in the route handlers
      req.user = userFound;
      next();
      
    } catch (error) {
      console.error('Invalid token');
      return res.status(401).json({ message: 'Invalid Token', redirect: '/login' });
    }
  } else {
    console.error('No token provided');
    return res.status(401).json({ message: 'Not authorized, Please login', redirect: '/login' });
  }
});

export { protect };
