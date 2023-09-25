import asyncHnadler from 'express-async-handler'
import User from '../models/userModel';


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
    res.status(200).json({message:"Register user"})
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