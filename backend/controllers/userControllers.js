import asyncHnadler from 'express-async-handler'
import User from '../models/userModel.js';
import genereateToken from '../utils/generateToken.js';


//@desc Auth user/set token
//access Public
//route POST// /api/users
const authUser =asyncHnadler(async (req,res)=>{
   const {email,password}=req.body;
   const user = await User.findOne({email});
   if(user && (await user.matchPassword(password))){
    genereateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    });
}else{
    res.status(401);
    throw new Error("Invalid Email or Password")
}
  
});

//@desc createing new  user
//access Public
//route POST// /api/register
const registerUser =asyncHnadler(async (req,res)=>{
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error(' User already Exists');
    }
    const userRegister = await User.create({
        name,
        email,
        password
    });

    if(userRegister){
        genereateToken(res,userRegister._id)
        res.status(201).json({
            _id:userRegister._id,
            name:userRegister.name,
            email:userRegister.email
        });
    }else{
        res.status(400);
        throw new Error("Invalid User Data")
    }
});
//@desc logout USer
//access Public
//route POST// /api/logout
const logoutUser =asyncHnadler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"User Logout"})
});

//@desc get user profile
//access Private
//route POST// /api/users/profile
const getUserProfile =asyncHnadler(async (req,res)=>{
    // console.log(req.user)
    const userDetails = {
        name:req.user.name,
        email:req.user.email,
        user_id:req.user._id
    }
    // console.log(userDetails)
    res.status(200).json({message:"User profile"})
});

//@desc get update user profile
//access Private
//route PUT// /api/users/profile
const updateUserProfile =asyncHnadler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    // console.log(user)
    if(user){
        // console.log(req.body)
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password ;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email
        });
    }else{
        res.status(404);
        throw new Error('User Not Found')
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}