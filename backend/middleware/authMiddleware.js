import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req,res,next) => {
    let token ; 
    token = req.cookies.jwt;
    // console.log(token)
    if(token){
        try {
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decodedToken)
            req.user = await User.FindbyId(decodedToken.userId).select('-password');
            console.log(req.user)
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