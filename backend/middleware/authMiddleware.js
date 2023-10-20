import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModels/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let userFound = await User.findById(decodedToken.userId).select('-password');
      if (!userFound) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = userFound;
      console.log(userFound)
      next();
      
    } catch (error) {
      console.log('invalid token')
      return res.status(401).json({ message: 'Invalid Token',redirect:'/login'});
    }
  } else {
    console.log('no Token')
    return res.status(401).json({ message: 'Not authorized, Please login',redirect:'/login' });
  }
});

export { protect };
