// importing from modules
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


// importing models
import Seller from "../../models/SellerModel/SellerModel.js";
import OTP from "../../models/OTPModel.js";
import Hostel from "../../models/SellerModel/HostelModel.js";
import Booking from "../../models/BookHostelModel/BookHostelModel.js";
import Enquiry from "../../models/UserModels/enquery.js";
import RoomChat from "../../models/chatRoom.js";
// importing JWT token sellerside
import generateTokenSeller from "../../utils/generateTokenSeller.js";
import constants from "../Constants/constants.js";
import { sellerAggregateRevenue, sellerRevenueAmount, sellerTotal } from "./SellerRevenue.js";

// -------------------------SENT OTP NodeMailer---------------------------------------
/**
 * Send Forget Password Email
 This function is responsible for sending a forget password email to a user, including the user's name and a one-time password (OTP) for password reset.
 * @param {string} name - The user's name to personalize the email.
 * @param {string} email - The recipient's email address.
 * @param {string} OTP - The one-time password for password reset.
 */
 const sendForgetPassword = async (name, email, OTP) => {
  try {
    // Create a nodemailer transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER, // Your email user
        pass: process.env.NEW_APP_PASSWORD, // Your email password or app-specific password
      },
    });

    // Compose the email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Recipient's email address
      subject: "Reset your Password", // Email subject
      html: `<p>Hi ${name}, <br> Did you request a password reset...?<br>If Yes...<br> Your OTP for resetting the password is ${OTP}`, // Email content
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email successfully sent", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

