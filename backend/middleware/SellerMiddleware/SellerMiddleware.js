import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Seller from "../../models/SellerModel/SellerModel.js";


const sellerMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.headers.authorization
  console.log(req.headers)
  if (token) {
    try {
      console.log("token seller received")
      token = token.split(' ')[1];
      console.log(token)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let seller = await Seller.findById(decodedToken.sellerId).select('-password');
      if (!seller) {
        return res.status(401).json({ message: 'Seller not found' });
      }
      console.log('seller Token Verified')
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
