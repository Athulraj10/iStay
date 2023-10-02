import asyncHnadler from "express-async-handler";
import User from "../models/userModel.js";
import genereateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer'
import { sessionSecret,emailUser,NewAppPassword } from "../config/config.js";
import OTP from "../models/OTPModel.js";




//@desc forgetOTP
//access Public
//route POST// users/forget
const sendForgetPassword = async (name, email, OTP) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: emailUser,
                pass: NewAppPassword
            }
        });
        const mailOptions = {
            from: emailUser,
            to: email,
            subject: "Reset your Password",
            html: `<p>Hi ${name}, <br> Did you requsted for a Password reset...?<br>If Yes...<br> Your OTP For reset password is ${OTP}`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log("email successfully", info.response);
            }
        })

    } catch (error) {
        console.log(error.message)
    }
}

// ----------------------------------------------------------------

const OTPsaveFunction = async (email, otp) => {
    try {
        const existingOTP = await OTP.findOne({ email });
        if (existingOTP) {
            await OTP.deleteOne({ email });
        }

        const saveOTP = new OTP({
            email: email,
            otp: otp
        });
        const OTPsaved = await saveOTP.save();
        console.log(OTPsaved)
        return;
    } catch (error) {
        console.log(error.message);
    }
};

// -------------------save OTP---------------------------









//@desc Auth user/set token
//access Public
//route POST// /api/users
const authUser = asyncHnadler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Invalid Email or Password",
    });
    throw new Error("Invalid Email or Password");
  }
  if (user && (await user.matchPassword(password))) {
    genereateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc createing new  user
//access Public
//route POST// /api/register
const registerUser = asyncHnadler(async (req, res) => {
  const { userName, email, password, mobile } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(" User already Exists");
  }
  const userRegister = await User.create({
    name: userName,
    email,
    password,
    mobile,
  });
  console.log(userRegister);

  if (userRegister) {
    genereateToken(res, userRegister._id);
    res.status(201).json({
      _id: userRegister._id,
      name: userRegister.name,
      email: userRegister.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc Auth user/set token
//access Public
//route POST// /api/users
const forget = asyncHnadler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }
  if (user) {
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);
    // sendForgetPassword(user.name, user.email, OTPgenerated);
    console.log(OTPgenerated)
    const saveOrNot = await OTPsaveFunction(user.email, OTPgenerated);
    return res.json({
      email
    })
  }
});


const verifyOTP = asyncHnadler(async (req, res) => {
  const {email} = req.body;
  const otp = req.body.enteredOTP;
  console.log(req.body)
  try {
    const user = await OTP.findOne({ email });
    if(!user){return res.json({message:'Invalid Expired'})}
    if(user){
        const enterOTP=parseInt(otp)
        const databaseOTP= parseInt(user.otp)
        console.log(enterOTP)
        console.log(databaseOTP)
        if (enterOTP !== databaseOTP) {
            return res.status(401).json({ message: "Invalid OTP" });
        } 
        if (enterOTP === databaseOTP) {
          return res.json({data:true})
        } 
    }
} catch (error) {
    console.log(error.message)
}
});
// -----------------------------------------------------Reset Password-------------
const resetPassword = asyncHnadler(async (req, res) => {
  const {email} = req.body;
  const otp = req.body.enteredOTP;
  console.log(req.body)
  try {
    const user = await OTP.findOne({ email });
    if(!user){return res.json({message:'Invalid Expired'})}
    if(user){
        const enterOTP=parseInt(otp)
        const databaseOTP= parseInt(user.otp)
        console.log(enterOTP)
        console.log(databaseOTP)
        if (enterOTP !== databaseOTP) {
            return res.status(401).json({ message: "Invalid OTP" });
        } 
        if (enterOTP === databaseOTP) {
          return res.json({data:true})
        } 
    }
} catch (error) {
    console.log(error.message)
}
});

//@desc logout USer
//access Public
//route POST// /api/logout
const logoutUser = asyncHnadler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logout" });
});

//@desc get user profile
//access Private
//route POST// /api/users/profile
const getUserProfile = asyncHnadler(async (req, res) => {
  // console.log(req.user)
  const userDetails = {
    name: req.user.name,
    email: req.user.email,
    user_id: req.user._id,
  };
  // console.log(userDetails)
  res.status(200).json({ message: "User profile" });
});

//@desc get update user profile
//access Private
//route PUT// /api/users/profile
const updateUserProfile = asyncHnadler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user)
  if (user) {
    // console.log(req.body)
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  forget,
  getUserProfile,
  updateUserProfile,
  verifyOTP,resetPassword
};
