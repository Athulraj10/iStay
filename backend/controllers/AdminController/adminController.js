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
import { aggregateRevenue } from "./aggregateRevenue.js";
import { aggregateAllHostels } from "./aggregateHostel.js";
import jwt from "jsonwebtoken";


// // -------------------Register New admin---------------------------
// //@desc createing new  user
// //access Public
// //route POST// /api/register

const registerSeller = asyncHandler(async (req, res) => {
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
});


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
      const token = jwt.sign({ admin_id:admin._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    
    //   res.cookie('jwt_Admin', token ,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV !== 'development',
    //     sameSite : 'strict',
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    // })
  

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

/**
 * Admin Forget Password Function
 *
 * This function initiates the password reset process for administrators. It verifies the provided email, generates a one-time password (OTP), and sends it to the administrator's registered email address for password recovery.
 *
 * @param {Object} req - The request object containing user input.
 * @param {Object} res - The response object used to send back results.
 *
 * @throws {Error} - If any errors occur during the OTP generation and email sending process, they are logged.
 */
const adminForget = asyncHandler(async (req, res) => {
  try {
    // Extract the email from the request body
    const { email } = req.body;

    // Search for an admin user with the provided email
    const admin = await Admin.findOne({ email });

    // If no admin is found with the provided email, return an unauthorized response
    if (!admin) {
      return res.status(401).json({
        message: constants.INVALID_EMAIL,
      });
    }

    // If the admin is found, generate a one-time password (OTP)
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP to the admin's registered email
    sendForgetPassword(admin.name, admin.email, OTPgenerated);

    // Log the generated OTP
    console.log(OTPgenerated);

    // Save the generated OTP for later verification
    const saveOrNot = await OTPsaveFunction(admin.email, OTPgenerated);

    // Return a success response with the admin's email
    return res.json({
      email,
    });
  } catch (error) {
    // Handle any errors that occur during the OTP generation and email sending process
    console.error(error);
    return res.status(500).json({
      message: constants.INTERNAL_SERVER_ERROR,
    });
  }
});

/**
 * Admin Verify OTP Function
 *
 * This function verifies the one-time password (OTP) entered by an administrator for password recovery. It compares the entered OTP with the one stored in the database for the corresponding email. If the OTPs match, it returns a successful response; otherwise, it returns an "Invalid OTP" response.
 *
 * @param {Object} req - The request object containing user input.
 * @param {Object} res - The response object used to send back results.
 *
 * @throws {Error} - If any errors occur during the OTP verification process, they are logged.
 */
const adminVerifyOTP = asyncHandler(async (req, res) => {
  // Extract email and entered OTP from the request body
  const { email } = req.body;
  const otp = req.body.enteredOTP;

  try {
    // Find an OTP record for the provided email
    const admin = await OTP.findOne({ email });

    // If no record is found, return an invalid email response
    if (!admin) {
      return res.json({ message: constants.INVALID_EMAIL });
    }

    // If an OTP record is found
    if (admin) {
      // Parse the entered OTP from the request and the OTP from the database
      const enterOTP = parseInt(otp);
      const databaseOTP = parseInt(admin.otp);

      // Check if the entered OTP does not match the OTP from the database
      if (enterOTP !== databaseOTP) {
        return res.status(401).json({ message: constants.INVALID_OTP });
      }

      // If the OTPs match, return a successful response with the admin's email
      if (enterOTP === databaseOTP) {
        return res.status(200).json({ admin: admin.email });
      }
    }
  } catch (error) {
    // Handle any errors that occur during the execution of this function
    console.error(error.message);
  }
});

/**
 * Admin Reset Password Function
 *
 * This function allows an administrator to reset their password. It takes the administrator's user ID (email) and the new password as input. If the user ID is found, it updates the password in the database and returns a "Password Reset Successfully" response. If the user ID is not found, it returns an "Internal Server Error" response.
 *
 * @param {Object} req - The request object containing user input.
 * @param {Object} res - The response object used to send back results.
 *
 * @throws {Error} - If any errors occur during the password reset process, they are logged.
 */
const adminResetPassword = asyncHandler(async (req, res) => {
  // Extract user ID (email) and new password from the request body
  const { userId, password } = req.body;
  console.error(req.body);

  try {
    // Find an administrator by the provided email (user ID)
    const admin = await Admin.findOne({ email: userId });

    // If no admin is found, return a "Not Found" response
    if (!admin) {
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    // If an admin is found
    if (admin) {
      // Update the admin's password with the new password
      admin.password = password;

      // Save the changes in the database
      await admin.save();

      // Return a "Password Reset Successfully" response
      res.status(200).json({ message: constants.PASSWORD_RESET_SUCCESSFULLY });
    }
  } catch (error) {
    // Handle any errors that occur during the execution of this function
    console.error(error);

    // Return an "Internal Server Error" response in case of an error
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});



