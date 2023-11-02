import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Seller from "../../models/SellerModel/SellerModel.js";


const sellerMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.cookie
  .split('; ')
  .find(cookie => cookie.startsWith('seller_JWT_token='))
  .split('=')[1];
  
  if (token) {
    console.log("token received")
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let seller = await Seller.findById(decodedToken.sellerId).select('-password');
      if (!seller) {
        return res.status(401).json({ message: 'Seller not found' });
      }
      req.seller = seller;
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

export { sellerMiddleware };
