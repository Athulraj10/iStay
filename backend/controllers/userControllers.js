import asyncHnadler from 'express-async-handler'
import User from '../models/userModel.js';


//@desc Auth user/set token
//access Public
//route POST// /api/users
const authUser =asyncHnadler(async (req,res)=>{
    res.status(200).json({message:"Auth user"})
});

//@desc create user
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
    console.log(userRegister)
    if(userRegister){
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
    res.status(200).json({message:"Logout User"})
});

//@desc get user profile
//access Private
//route POST// /api/users/profile
const getUserProfile =asyncHnadler(async (req,res)=>{
    res.status(200).json({message:"User profile"})
});

//@desc get update user profile
//access Private
//route PUT// /api/users/profile
const updateUserProfile =asyncHnadler(async (req,res)=>{
    res.status(200).json({message:"update user profile"})
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}