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


// -------------------Save OTP with UserEmail---------------------------
/**
 * OTP Save Function

 * This function is responsible for saving a one-time password (OTP) associated with a user's email. It first checks if an OTP for the given email already exists, and if so, it deletes the existing OTP. Then, it saves the new OTP to the database.
 *
 * @param {string} email - The user's email address for which the OTP is generated.
 * @param {string} otp - The one-time password to be saved.
 */
const OTPsaveFunction = async (email, otp) => {
  try {
    // Check if an existing OTP for the email exists and delete it if found
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      await OTP.deleteOne({ email });
    }

    // Create a new OTP document with the email and OTP
    const saveOTP = new OTP({
      email: email,
      otp: otp,
    });

    // Save the new OTP to the database
    const OTPsaved = await saveOTP.save();
    return; // Return without any specific value if successful
  } catch (error) {
    console.log(error.message);
  }
};


// -------------------Aggrigate Booking---------------------------
/**
 * Aggregate Bookings with Hostel and User Details
 * This function aggregates booking information along with hostel and user details for a given seller (hostel owner) based on their seller ID.
 * @param {string} sellerId - The ID of the seller (hostel owner) for whom bookings are to be aggregated.
 * @returns {Array} - An array of aggregated booking details with hostel and user information.
 */
