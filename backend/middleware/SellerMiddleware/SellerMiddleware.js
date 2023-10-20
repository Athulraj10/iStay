import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Seller from "../../models/SellerModel/SellerModel";


const sellerMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    console.log(token)
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let seller = await Seller.findById(decodedToken.userId).select('-password');
      if (!seller) {
        return res.status(401).json({ message: 'Seller not found' });
      }
      req.seller = seller;
      console.log(seller)
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
