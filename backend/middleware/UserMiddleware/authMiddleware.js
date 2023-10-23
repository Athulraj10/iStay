import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/UserModels/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt_User;
  console.log("token sliceed is"+ token.slice(0,10))
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
      console.error('invalid token')
      return res.status(401).json({ message: 'Invalid Token',redirect:'/login'});
    }
  } else {
    console.error('no Token')
    return res.status(401).json({ message: 'Not authorized, Please login',redirect:'/login' });
  }
});

export { protect };
