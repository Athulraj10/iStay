import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import {
  sessionSecret,
  emailUser,
  NewAppPassword,
} from "../../config/config.js";
import Admin from "../../models/AdminModel/adminModel.js";
import User from "../../models/UserModels/userModel.js";
import OTP from "../../models/OTPModel.js";
import generateToken from "../../utils/generateToken.js";
import Seller from "../../models/SellerModel/SellerModel.js";

//@desc forgetOTP
//access Public
//route POST// users/forget
// -------------------------Admin forget SENT OTP NodeMailer---------------------------------------
const sendForgetPassword = async (name, email, OTP) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: NewAppPassword,
      },
    });
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Reset your Password",
      html: `<p>Hi ${name}, <br> Did you requsted for a Password reset...?<br>If Yes...<br> Your OTP For reset password is ${OTP}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email successfully", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

// -------------------Save OTP Function with UserEmail---------------------------
const OTPsaveFunction = async (email, otp) => {
  try {
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      await OTP.deleteOne({ email });
    }
    const saveOTP = new OTP({
      email: email,
      otp: otp,
    });
    const OTPsaved = await saveOTP.save();
    return;
  } catch (error) {
    console.log(error.message);
  }
};

// -------------------admin Authentication---------------------------
// @desc Auth user/set token
// access Public
// route POST// /api/users
const adminAuthentication = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("admin not found");
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    if (admin && (await admin.matchPassword(password))) {
      // Assuming generateToken is a valid function
      const token = generateToken(res, admin._id); // Pass res as the first argument

      return res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token, // Send the token back to the client
      });
    }

    // If the password doesn't match
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  } catch (error) {
    // Handle any errors that occur during the execution of this function
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// // -------------------Register New admin---------------------------
// //@desc createing new  user
// //access Public
// //route POST// /api/register

// const registerSeller = asyncHandler(async (req, res) => {
//   const { name, email, password, mobile } = req.body;
//   const sellerExists = await Admin.findOne({ email });

//   if (sellerExists) {
//     const error = new Error("Admin Already Exists");
//     res.status(400);
//     error.status = 400;
//     throw error;
//   }

//   // If admin does not exist, create a new admin
//   const sellerRegister = await Admin.create({
//     name,
//     email,
//     password,
//     mobile,
//   });

//   if(sellerRegister){
//     generateToken(res,sellerRegister._id);
//     res.status(201).json({
//       _id:sellerRegister._id,
//       name:sellerRegister.name,
//       email:sellerRegister.email
//     })
//   }
// });

// -------------------Forget Password Admin Verification---------------------------
//@desc Auth user/set token
//access Public
//route POST// /api/users
const adminForget = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }
  if (admin) {
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);
    sendForgetPassword(admin.name, admin.email, OTPgenerated);
    console.log(OTPgenerated);
    const saveOrNot = await OTPsaveFunction(admin.email, OTPgenerated);
    return res.json({
      email,
    });
  }
});

// -----------------------------Verify OTP ---------------------------
const adminVerifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = req.body.enteredOTP;
  try {
    const admin = await OTP.findOne({ email });
    if (!admin) {
      return res.json({ message: "Invalid Expired" });
    }
    if (admin) {
      const enterOTP = parseInt(otp);
      const databaseOTP = parseInt(admin.otp);
      if (enterOTP !== databaseOTP) {
        return res.status(401).json({ message: "Invalid OTP" });
      }
      if (enterOTP === databaseOTP) {
        return res.status(200).json({ admin: admin.email });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

// ----------------------------Reset Password-------------
const adminResetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email: userId });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (admin) {
      admin.password = password;
      await admin.save();
      res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});




// ----------------------------Dashboard Values------------------------------
const dashboardValuesCount = asyncHandler(async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const sellerCount = await Seller.countDocuments();
    // const hostelCount = await User.countDocuments();
    if (!userCount) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (userCount) {
      return res.status(200).json({
        userCount,
        sellerCount,
        hostelCount:1
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});





// ----------------------------Block User------------------------------
const blockUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------List User------------------------------
const listUser = asyncHandler(async (req, res) => {
  try {
    const AllUser = await User.find();
    if (!AllUser) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (AllUser) {
      return res.status(200).json({
        data: AllUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------Edit User New Details Updating------------------------------
const editUserDetails = asyncHandler(async (req, res) => {
  try {
    const { userName, email, mobile, location, userId } = req.body;
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      user.userName = userName;
      user.email = email;
      user.mobile = mobile;
      user.location = location;
      const userUpdated = await user.save();
      console.log(userUpdated);
      return res.status(200).json({ userData: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// --------------------------Edit user Get User details---------------------------
const editUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      return res.status(200).json({ userData: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});





// ----------------------------List Sellers------------------------------
const listSellers = asyncHandler(async (req, res) => {
  try {
    const allSeller = await Seller.find();
    if (!allSeller) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (allSeller) {
      return res.status(200).json({
        data: allSeller,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// --------------------------Edit Seller Get User details---------------------------
const editSeller = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const seller = await Seller.findOne({ _id: id }).select("-password");
    if (!seller) {
      return res.status(404).json({ message: "User not found" });
    }
    if (seller) {
      return res.status(200).json({ sellerData: seller });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------Edit Seller New Details Updating------------------------------
const editSellerDetails = asyncHandler(async (req, res) => {
  try {
    const { sellerName, email, mobile, locations, sellerId } = req.body;
    const seller = await Seller.findOne({ _id: sellerId }).select("-password");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    if (seller) {
      seller.name = sellerName;
      seller.email = email;
      seller.mobile = mobile;
      seller.location = locations;
      await seller.save();
      return res.json({ sellerData: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});



// --------------------------Logout clearing JWT---------------------------
//@desc logout USer
//access Public
//route POST// /api/logout
const logoutUser = asyncHandler(async (req, res) => {
  console.log("logout");
  // Set the SameSite attribute to None and Secure to true for cross-site cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false, // Set to true if you're using HTTPS
    sameSite: "none", // Set to "none" for cross-site cookies
  });

  res.status(200).json({ status: "User Logout" });
});

// ---------------------------Get User Profile---------------------------
//@desc get user profile
//access Private
//route POST// /api/users/profile
// const getUserProfile = asyncHandler(async (req, res) => {
//   // console.log(req.user)
//   const userDetails = {
//     name: req.user.name,
//     email: req.user.email,
//     user_id: req.user._id,
//   };
//   // console.log(userDetails)
//   res.status(200).json({ message: "User profile" });
// });

// ---------------------------Update User Profile---------------------------
//@desc get update user profile
//access Private
//route PUT// /api/users/profile
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   // console.log(user)
//   if (user) {
//     // console.log(req.body)
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }
//     const updatedUser = await user.save();
//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User Not Found");
//   }
// });

export {
  adminAuthentication,
  adminForget,
  // getUserProfile,
  // updateUserProfile,
  adminVerifyOTP,
  adminResetPassword,
  
  // ----------user Management
  listUser,
  editUser,
  editUserDetails,
  blockUser,
  
  
  // ---------dashboard Management
  dashboardValuesCount,
  
  
  // ----------Seller Management
  listSellers,
  editSeller,
  editSellerDetails,


  logoutUser,
};
