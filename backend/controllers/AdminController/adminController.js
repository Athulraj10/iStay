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

