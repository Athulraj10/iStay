import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../../models/AdminModel/adminModel.js";

const adminMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwtAdminKey;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let adminFount = await Admin.findById(decodedToken.userId).select('-password');
      if (!adminFount) {
        return res.status(401).json({ message: 'Admin not found' });
      }
      req.admin = adminFount;
      console.log(adminFount)
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
