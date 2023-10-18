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
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, No token' });
  }
});

export { protect };
