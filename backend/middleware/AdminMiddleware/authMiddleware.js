import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../../models/AdminModel/adminModel.js";

const adminMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt_Admin;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let adminFound = await Admin.findById(decodedToken.admin_id).select('-password');
      if (!adminFound) {
        return res.status(401).json({ message: 'Admin not found' });
      }
      req.admin = adminFound;
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

export { adminMiddleware };
