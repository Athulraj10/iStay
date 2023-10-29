// importing library from npm
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
// import {
//   process.env.EMAIL_USER,
//   process.env.NEW_APP_PASSWORD,
// } from "../../config/config.js";

// importing JWT from utils
import generateTokenAdmin from "../../utils/generateTokenAdmin.js";

// ----------Importing Models
import Admin from "../../models/AdminModel/adminModel.js";
import User from "../../models/UserModels/userModel.js";
import OTP from "../../models/OTPModel.js";
import Seller from "../../models/SellerModel/SellerModel.js";
import Hostel from "../../models/SellerModel/HostelModel.js";
import Booking from "../../models/BookHostelModel/BookHostelModel.js";
import constants from "../Constants/constants.js";

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


// **
//  * Function Hostel Aggregating Function 
//  * This function is responsible for get the all hostel details with sellers
// with the response to the approprite referance of seller 

//  * It allows To take all hostel datas
//  *
//  * @param {return} res - Express response object.
//  * @returns {Object} - return all the hostel details with appropite values
//  *
//  * @throws {Error} - If any error occurs during the process, an internal server error message is returned.
//  */
/////////////////////////////// Hostel Management //////////////////
const aggregateAllHostels = async () => {
  try {
    const aggregatedData = await Hostel.aggregate([
      {
        $lookup: {
          from: 'sellers', // The name of the Seller collection
          localField: 'seller',
          foreignField: '_id',
          as: 'sellerDetails',
        },
      },
      {
        $unwind: '$sellerDetails', // Deconstruct the array created by $lookup
      },
      {
        $project: {
          _id: 1,
          hostelName: 1,
          category: 1,
          images: 1,
          mainLocation: 1,
          description: 1,
          fullDetails: 1,
          contactNumber: 1,
          // mapLink: 1,
          // additionalAboutHostel: 1,
          // nearByLocation: 1,
          // restrictions: 1,
          // descriptionAboutHostel: 1,
          // guestProfile: 1,
          price: 1,
          isBlock:1,
          // extraPrice: 1,
          // totalBedInRoom: 1,
          // bedAvailableNow: 1,
          // Wifi: 1,
          // food: 1,
          // parking: 1,
          // drinkingWater: 1,
          // Include other fields you need from the Hostel collection
          // Include seller fields you need from the Seller collection
          // For example:
          'sellerDetails.name': 1,
          'sellerDetails.email': 1,
          'sellerDetails.location': 1,
          'sellerDetails.mobile': 1,
          // Include all other fields you need
        },
      },
    ]);
    return aggregatedData
  } catch (error) {
    console.error('Error aggregating data:', error);
  }
};


/**
 * Send Forget Password Email
 *
 * This function is responsible for sending a forget password email to a user. It contains essential information for the password reset process, including the user's name and a one-time password (OTP).
 *
 * @param {string} name - The user's name to personalize the email.
 * @param {string} email - The recipient's email address.
 * @param {string} OTP - The one-time password for password reset.
 *
 * @throws {Error} - If any error occurs during the email sending process, it is logged.
 */
const sendForgetPassword = async (name, email, OTP) => {
  try {
    // Create a transporter for sending email using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.NEW_APP_PASSWORD,
      },
    });

    // Compose the email with recipient details, subject, and HTML content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your Password",
      html: `<p>Hi ${name}, <br> This Message from iStay <br> Did you request a password reset...?<br>If Yes...<br> Your OTP for password reset is ${OTP}`,
    };

    // Send the email and log success or error
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent successfully", info.response);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * OTP Save Function
 * This function is responsible for managing and saving one-time passwords (OTPs) for email-based operations, such as user registration, password reset, or other authentication-related processes. It ensures that only the latest OTP associated with an email address is saved.
 * @param {string} email - The email address to which the OTP is associated.
 * @param {string} otp - The one-time password to be saved.
 * @throws {Error} - If any error occurs during the OTP saving process, it is logged.
 */
const OTPsaveFunction = async (email, otp) => {
  try {
    // Check if an OTP already exists for the provided email and delete it
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      await OTP.deleteOne({ email });
    }

    // Create a new OTP document and save it
    const saveOTP = new OTP({
      email: email,
      otp: otp,
    });
    const OTPsaved = await saveOTP.save();

    return; // Indicate successful OTP saving
  } catch (error) {
    console.error(error.message);
  }
};
/**
 * Admin Authentication Function
 *
 * This function handles the authentication process for administrators. It verifies the provided email and password, and upon successful authentication, it generates an authentication token for the administrator's session.
 *
 * @param {Object} req - The request object containing user input.
 * @param {Object} res - The response object used to send back results.
 *
 * @throws {Error} - If any errors occur during the authentication process, they are logged.
 */
const adminAuthentication = asyncHandler(async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Search for an admin user with the provided email
    const admin = await Admin.findOne({ email });

    // If no admin is found with the provided email, return an unauthorized response
    if (!admin) {
      return res.status(401).json({
        message: constants.EMAIL_PASSWORD_INCORRECT,
      });
    }

    // If the admin is found, check if the provided password matches
    if (admin && (await admin.matchPassword(password))) {
      // Assuming generateTokenAdmin is a valid function, generate an authentication token
      const token = generateTokenAdmin(res, admin._id);

      // Return a successful response with user details and the generated token
      return res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token,
      });
    }

    // If the password doesn't match, return an unauthorized response
    return res.status(401).json({
      message: constants.EMAIL_PASSWORD_INCORRECT,
    });
  } catch (error) {
    // Handle any errors that occur during the execution of this function
    console.error(error);
    return res.status(500).json({
      message: constants.INTERNAL_SERVER_ERROR,
    });
  }
});

const adminForget = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.error(req.body);
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({
      message: constants.INVALID_EMAIL,
    });
  }
  if (admin) {
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);
    sendForgetPassword(admin.name, admin.email, OTPgenerated);
    console.error(OTPgenerated);
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
      return res.json({ message: constants.INVALID_EMAIL });
    }
    if (admin) {
      const enterOTP = parseInt(otp);
      const databaseOTP = parseInt(admin.otp);
      if (enterOTP !== databaseOTP) {
        return res.status(401).json({ message: constants.INVALID_OTP });
      }
      if (enterOTP === databaseOTP) {
        return res.status(200).json({ admin: admin.email });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});
// ----------------------------Reset Password-------------
const adminResetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  console.error(req.body);
  try {
    const admin = await Admin.findOne({ email: userId });
    if (!admin) {
      return res
        .status(404)
        .json({ message: constants.INTERNAL_SERVER_ERROR });
    }
    if (admin) {
      admin.password = password;
      await admin.save();
      res.status(200).json({ message: constants.PASSWORD_RESET_SUCCESSFULLY });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});

const revenueFunction = asyncHandler(async()=>{
  try {
    const totalRevenueGenerate = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" }
        }
      }
    ]);
    return totalRevenueGenerate !==null ? totalRevenueGenerate : 0
  } catch (error) {
    console.error(error)
  }
})

// ----------------------------Dashboard Values------------------------------
const dashboardValuesCount = asyncHandler(async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const sellerCount = await Seller.countDocuments();
    const hostelCount = await Hostel.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const userBlockCount = await User.countDocuments({isBlock:true});
    const sellerBlockCount = await Seller.countDocuments({isBlock:true});
    const hostelBlockCount = await Hostel.countDocuments({isBlock:true});
    const revenue = await revenueFunction();
    console.error(revenue)
    
    if (!userCount) {
      return res
        .status(404)
        .json({ message: constants.INTERNAL_SERVER_ERROR});
    }
    if (userCount) {
      return res.status(200).json({
        userCount,
        userBlockCount,
        sellerCount,
        sellerBlockCount,
        hostelCount,
        hostelBlockCount,

        bookingCount,
        revenue:revenue[0].totalAmount || 0
        
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});
/////////////////////////////// Admin Management Completed //////////////////








/////////////////////////////// Hostel Management //////////////////
// ----------------------------list Hostel Admin------------------------------------
const listHostelsAdmin = asyncHandler(async (req, res) => {
  try {
    const listHostels = await aggregateAllHostels();
    res.status(200).json({data:listHostels})
  } catch (error) {
    console.error("listHostelAdmin");
    res.status(500).json({
      message: "Hostel List Error",
    });
  }
});

// ----------------------------Block Hostel------------------------------------
const BlockHostelsAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id; // Assuming you receive the hostel ID in the request body
  try {
    // Find the hostel by ID
    const hostel = await Hostel.findById(id);
    if (!hostel) {
      return res.status(404).json({ message: constants.HOSTEL_NOT_FOUND });
    }
    hostel.isBlock = !hostel.isBlock;  // Toggle the isBlock status
    const updatedHostel = await hostel.save(); // Save the updated hostel
    if (updatedHostel) {
      const message = `Hostel ${hostel.hostelName} is ${hostel.isBlock ? "blocked" : 'UnBlock SuccessFully'}`
      const status = hostel.isBlock;
      return res.status(200).json({message,status})
    } else {
      return res.status(404).json({ message: constants.HOSTEL_NOT_FOUND });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});
/////////////////////////////// Hostel Management Completed //////////////////










/////////////////////////////// User Management ////////////////////////
// ----------------------------List User------------------------------
const listUser = asyncHandler(async (req, res) => {
  try {
    const AllUser = await User.find();
    if (!AllUser) {
      return res
        .status(404)
        .json({ message: constants.INTERNAL_SERVER_ERROR});
    }
    if (AllUser) {
      return res.status(200).json({
        data: AllUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});
// ----------------------------Block User------------------------------
const blockUser = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: constants.INVALID_SELLER_ID });
      }
      const user = await User.findOne({ _id: id }).select("-password");
      if (!user) {
        return res.status(404).json({ message: constants.SELLER_NOT_FOUND });
      }
      user.isBlock = !user.isBlock;
      await user.save();
      const message = `User ${user.name} is ${user.isBlock ? "blocked" : 'UnBlock SuccessFully'}`
      const status = user.isBlock;
      return res.status(200).json({message,status})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
    }
  });
/////////////////////////////// User Management Completed //////////////////



/////////////////////////////// Seller Management /////////////////////////
// ----------------------------List Sellers------------------------------
const listSellers = asyncHandler(async (req, res) => {
  try {
    const allSeller = await Seller.find();
    if (!allSeller) {
      return res
        .status(404)
        .json({ message: constants.INTERNAL_SERVER_ERROR });
    }
    if (allSeller) {
      return res.status(200).json({
        data: allSeller,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});
// --------------------------Block Seller---------------------------
const blockSeller = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: constants.INVALID_SELLER_ID });
    }
    const seller = await Seller.findOne({ _id: id }).select("-password");
    if (!seller) {
      return res.status(404).json({ message: constants.INVALID_SELLER_ID });
    }
    seller.isBlock = !seller.isBlock;
    await seller.save();
    const message = `Seller ${seller.name} is ${seller.isBlock ? "blocked" : 'UnBlock SuccessFully'}`
    const status = seller.isBlock;
    return res.status(200).json({message,status})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});
/////////////////////////////// Seller Management Completed ///////////////



// --------------------------Logout clearing JWT---------------------------
//@desc logout USer
//access Public
//route POST// /api/logout
const logoutAdmin = asyncHandler(async (req, res) => {
  console.log("logout");
  // Set the SameSite attribute to None and Secure to true for cross-site cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false, // Set to true if you're using HTTPS
    sameSite: "none", // Set to "none" for cross-site cookies
  });

  res.status(200).json({ status: constants.ADMIN_LOGOUT });
});

// ---------------------------Get User Profile---------------------------
//@desc get user profile
//access Private
//route POST// /api/users/profile
// const getUserProfile = asyncHandler(async (req, res) => {
//   // console.error(req.user)
//   const userDetails = {
//     name: req.user.name,
//     email: req.user.email,
//     user_id: req.user._id,
//   };
//   // console.error(userDetails)
//   res.status(200).json({ message: "User profile" });
// });

// ---------------------------Update User Profile---------------------------
//@desc get update user profile
//access Private
//route PUT// /api/users/profile
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   // console.error(user)
//   if (user) {
//     // console.error(req.body)
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
  // -----------------------------User Management
  listUser,
  blockUser,
  // ------------------------------Dashboard Management
  dashboardValuesCount,
  // --------------------------------Hostel Management
  listHostelsAdmin,
  BlockHostelsAdmin,
  // ---------------------------------Seller Management
  listSellers,
  blockSeller,
  logoutAdmin,
};
