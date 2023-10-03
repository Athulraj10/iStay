import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModels/userModel.js";

const protect = asyncHandler(async (req,res,next) => {
    let token ; 
    token = req.cookies.jwt;
    // console.log(token)
    if(token){
        try {
            // console.log('token is ', token)
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            // console.log( decodedToken)
            let userFinded = await User.findById(decodedToken.userId).select('-password');
            // console.log(userFinded)
            req.user=userFinded
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Invalid Token ')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, No token')
    }
})

export {protect}