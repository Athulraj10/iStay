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
const aggregateBookingWithHostel = async (sellerId) => {
  try {
    // Use MongoDB's aggregation framework to join and group data
    const result = await Booking.aggregate([
      {
        $match: { seller: new mongoose.Types.ObjectId(sellerId) },
      },
      {
        $lookup: {
          from: "hostels",
          localField: "hostel",
          foreignField: "_id",
          as: "hostelDetails",
        },
      },
      {
        $unwind: "$hostelDetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $group: {
          _id: "$_id",
          paymentMethod: { $first: "$paymentMethod" },
          paymentVia: { $first: "$paymentVia" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          totalAmount: { $first: "$totalAmount" },
          hostelDetails: { $first: "$hostelDetails" },
          userDetails: { $first: "$userDetails" },
        },
      },
    ]);

    return result;
  } catch (error) {
    console.log(error);
  }
};



// -------------------seller Authentication---------------------------
/**
 * Authenticate Seller
 * This function is responsible for authenticating a seller by verifying their email and password. It checks if the provided email and password match any seller's credentials. If successful, it generates a token for the seller and sends their information along with the token in the response.
 * @param {Object} req - The HTTP request object containing the seller's email and password.
 * @param {Object} res - The HTTP response object to send the authentication result and token.
 * @returns {Object} - An object containing seller information and a generated authentication token.
 * @throws {Error} - If any error occurs during the authentication process, it is logged.
 */

const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the seller by their email
  const seller = await Seller.findOne({ email });

  if (!seller) {
    return res.status(401).json({
      message: constants.EMAIL_PASSWORD_INCORRECT,
    });
  }

  if (seller.isBlock) {
    return res.status(401).json({
      message: constants.SELLER_BLOCKED,
    });
  }

  if (seller && (await seller.matchPassword(password))) {
    const token = jwt.sign({ sellerId:seller._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  
    // res.cookie("jwt_Seller", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== "development",
    //   sameSite: "strict",
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });
    return res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      token,
    });
  }

  // If the password doesn't match
  return res.status(401).json({
    message: constants.EMAIL_PASSWORD_INCORRECT,
  });
});




// -------------------Register New seller---------------------------
/**
 * Register Seller
 * This function is responsible for registering a new seller. It checks if a seller with the given email already exists and, if not, creates a new seller account. After successful registration, it generates an authentication token for the seller and sends their information in the response.
 * @param {Object} req - The HTTP request object containing the seller's name, email, password, and mobile number.
 * @param {Object} res - The HTTP response object to send the registration result, token, and seller information.
 * @returns {Object} - An object containing seller information and a generated authentication token after successful registration.
 * @throws {Error} - If a seller with the given email already exists, it throws an error with a 400 status code.
 */
const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  // Check if a seller with the same email already exists
  const sellerExists = await Seller.findOne({ email });

  if (sellerExists) {
    const error = new Error(constants.SELLER_ALREADY_EXISTS);
    res.status(400);
    error.status = 400;
    throw error;
  }

  // If the seller does not exist, create a new seller account
  const sellerRegister = await Seller.create({
    name,
    email,
    password,
    mobile,
  });

  if (sellerRegister) {
    // Generate an authentication token for the newly registered seller
    generateTokenSeller(res, sellerRegister._id);

    res.status(201).json({
      _id: sellerRegister._id,
      name: sellerRegister.name,
      email: sellerRegister.email,
    });
  }
});




// -------------------Forget Password Seller Verification---------------------------
/**
 * Seller Forget Password
 * This function is responsible for handling the "Forget Password" process for sellers. It takes the seller's email, checks if the email exists in the database, generates a one-time password (OTP), sends it to the seller's email, and saves the OTP in the database for verification.
 * @param {Object} req - The HTTP request object containing the seller's email.
 * @param {Object} res - The HTTP response object to send the result of the forget password process.
 * @returns {Object} - An object containing the seller's email to confirm the email address the OTP was sent to.
 * @throws {Error} - If the seller's email is not found in the database, it throws an error with a 401 status code.
 */
const sellerForget = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if a seller with the provided email exists
  const seller = await Seller.findOne({ email });

  if (!seller) {
    return res.status(401).json({
      message: constants.INVALID_EMAIL,
    });
  }

  if (seller) {
    // Generate a one-time password (OTP) for the seller
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP to the seller's email
    sendForgetPassword(seller.name, seller.email, OTPgenerated);
    console.log(OTPgenerated);

    // Save the generated OTP in the database for verification
    const saveOrNot = await OTPsaveFunction(seller.email, OTPgenerated);

    return res.json({
      email,
    });
  }
});


