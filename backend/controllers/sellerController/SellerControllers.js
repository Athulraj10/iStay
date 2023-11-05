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


// -----------------------------Verify OTP ---------------------------
/**
 * Seller Verify OTP
 * This function is responsible for verifying the OTP (One-Time Password) sent to the seller's email during the "Forget Password" process. It compares the entered OTP with the OTP stored in the database for the seller's email.
 *
 * @param {Object} req - The HTTP request object containing the seller's email and the entered OTP.
 * @param {Object} res - The HTTP response object to send the result of the OTP verification process.
 *
 * @returns {Object} - An object with the seller's email if the OTP is successfully verified.
 * @throws {Error} - If the entered OTP does not match the stored OTP, it throws an error with a 401 status code.
 */
const sellerVerifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = req.body.enteredOTP;

  try {
    // Check if there is a stored OTP for the seller's email
    const seller = await OTP.findOne({ email });

    if (!seller) {
      return res.json({ message: constants.OTP_EXPIRED });
    }

    if (seller) {
      // Convert the entered OTP and the database OTP to integers for comparison
      const enterOTP = parseInt(otp);
      const databaseOTP = parseInt(seller.otp);

      // Compare the entered OTP with the stored OTP
      if (enterOTP !== databaseOTP) {
        return res.status(401).json({ message: constants.INVALID_OTP });
      }

      // If the entered OTP matches the stored OTP, return the seller's email
      if (enterOTP === databaseOTP) {
        return res.status(200).json({ seller: seller.email });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});


// ----------------------------Reset Password-------------
/**
 * Seller Reset Password
 * This function is responsible for resetting the password of a seller. It retrieves the seller's information based on their email and updates the password with the new one provided in the request.
 * @param {Object} req - The HTTP request object containing the seller's email (as userId) and the new password.
 * @param {Object} res - The HTTP response object to send the result of the password reset process.
 * @returns {Object} - A success message when the seller's password is reset successfully.
 * @throws {Error} - If the seller does not exist, it throws an error with a 404 status code.
 */
const sellersResetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the seller based on their email (userId)
    const seller = await Seller.findOne({ email: userId });

    if (!seller) {
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (seller) {
      // Update the seller's password with the new password
      seller.password = password;
      await seller.save();

      // Send a success response when the password is reset
      res.status(200).json({ message: constants.PASSWORD_RESET_SUCCESSFULLY });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});



// -------------------Dashboard Values page---------------------------
/**
 * Dashboard Values
 * This function retrieves various statistics and data for a seller's dashboard, including the number of bookings, revenue, total sales, enquiries, and messages. It also fetches monthly revenue data for chart representation.
 * @param {Object} req - The HTTP request object containing the seller's ID (as sellerId).
 * @param {Object} res - The HTTP response object to send the retrieved data.
 * @returns {Object} - An object containing various dashboard values, including booking count, revenue, total sales, enquiry count, message count, and monthly revenue data for charts.
 * @throws {Error} - If there's an error during the process, it returns an error response with a 500 status code.
 */
const dashboardValues = asyncHandler(async (req, res) => {
  try {
    // Retrieve the seller's ID from the request
    const sellerId = req.query._id;
    // Count the number of bookings for the seller
    const bookingCount = await Booking.countDocuments({ seller: sellerId });
    // Calculate the seller's total revenue
    const revenue = await sellerRevenueAmount(sellerId);
    // Calculate the seller's total sales
    const totalSale = await sellerTotal(sellerId);
    // Count the number of unverified enquiries for the seller
    const enquery = await Enquiry.countDocuments({
      seller: sellerId,
      isVerified: false,
    });
    // Count the total messages in the chat room for the seller
    const totalMessages = await RoomChat.countDocuments({ seller: sellerId });
    // Fetch monthly revenue data for chart representation
    const sellerRevenueMonthlyBase = await sellerAggregateRevenue(sellerId);
    // Log sellerAggregateRevenue function for debugging purposes
    console.log(sellerAggregateRevenue);
    return res.status(200).json({
      bookingCount: bookingCount ? bookingCount : 0,
      revenue: revenue[0]?.totalAmount,
      totalSale: totalSale[0]?.totalAmount,
      enquery: enquery ? enquery : 0,
      messages: totalMessages ? totalMessages : 0,
      chartValues: sellerRevenueMonthlyBase,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});







// -------------------Seller Notificaition Count Page---------------------------
/**
 * Seller Notification
 * This function retrieves the number of bookings associated with a seller and sends it as a notification.
 *
 * @param {Object} req - The HTTP request object containing the seller's ID (as sellerInfo).
 * @param {Object} res - The HTTP response object to send the retrieved notification data.
 *
 * @returns {Object} - An object containing the number of bookings as a notification for the seller.
 * @throws {Error} - If there's an error during the process, it returns an error response with a 500 status code.
 */
const sellerNotification = asyncHandler(async (req, res) => {
  try {
    // Retrieve the seller's information from the request
    const sellerInfo = req.query.sellerInfo;

    // Count the number of bookings associated with the seller
    const sellerBookings = await Booking.countDocuments({ seller: sellerInfo });

    if (sellerBookings) {
      // Return the number of bookings as a notification
      return res.json({ sellerBookings });
    }

    if (!sellerBookings) {
      // If there are no bookings, return a status code 502 (Bad Gateway)
      return res.status(502)
    }
  } catch (error) {
    console.error(error);
  }
});




// -------------------Seller notificaiton detail page---------------------------
/**
 * Seller Notification Details
 * This function retrieves booking details associated with a seller and sends them as a notification.
 * @param {Object} req - The HTTP request object containing the seller's ID (as sellerId).
 * @param {Object} res - The HTTP response object to send the retrieved booking details as a notification.
 * @returns {Object} - An object containing booking details as a notification for the seller.
 * @throws {Error} - If there's an error during the process, it returns an error response with a 500 status code.
 */
const sellerNotificationDetails = asyncHandler(async (req, res) => {
  try {
    // Retrieve the seller's ID from the request
    const sellerId = req.query.sellerId;

    // Retrieve booking details associated with the seller using the aggregateBookingWithHostel function
    const sellerBookings = await aggregateBookingWithHostel(sellerId);

    if (sellerBookings) {
      // Return the booking details as a notification
      return res.json({ sellerBookings });
    }

    if (!sellerBookings) {
      // If there are no booking details, return a status code 502 (Bad Gateway)
      return res.status(502).json(null);
    }
  } catch (error) {
    console.error(error);
  }
});


// ----------------------------List listEnquery-------------
/**
 * List Enquiries for a Seller
 * This function retrieves and lists enquiries that are associated with a seller.
 * @param {Object} req - The HTTP request object containing seller information.
 * @param {Object} res - The HTTP response object to send the list of enquiries for the seller.
 * @returns {Object} - An object containing a list of enquiries for the seller.
 * @throws {Error} - If there's an error during the process, it logs the error and returns an error response with a 500 status code.
 */
const listEnquery = asyncHandler(async (req, res) => {
  try {
    // Retrieve the seller's ID from the request
    // const sellerId = req.seller._id;
    const sellerId = true;

    if (sellerId) {
      // Retrieve enquiries associated with the seller where isVerified is false
      const enquery = await Enquiry.find({
        // seller: sellerId,
        isVerified: false,
      });

      // Log the seller's ID and send the list of enquiries in the response
      console.log(sellerId);
      res.status(200).json({ enqueryData: enquery });
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});





// ----------------------------List listEnquery-------------
/**
 * List Enquiry Replies
 * This function handles the verification and replies to seller enquiries.
 * @param {Object} req - The HTTP request object containing enquiry information and reply message.
 * @param {Object} res - The HTTP response object to send the status of the verification and reply.
 * @returns {Object} - An object containing the status of the verification and reply.
 * @throws {Error} - If there's an error during the process, it logs the error and returns an error response with a 500 status code.
 */
const listEnqueryReply = asyncHandler(async (req, res) => {
  try {
    // Extract the ID and message from the request
    const { id } = req.params;
    const { message } = req.query;

    if (id && message) {
      // Find the enquiry by ID
      const enqueryReply = await Enquiry.findOne({ _id: id });

      if (enqueryReply) {
        // Update the enquiry with verification and seller reply
        enqueryReply.isVerified = true;
        enqueryReply.sellerReply = message;
        enqueryReply.status = "verified";
        await enqueryReply.save();

        // Send a response indicating that the update was successful
        return res.status(200).json({ updated: true });
      }
    } else {
      // If the ID or message is missing, return a bad request response
      res.status(400).json({ message: constants.BODY_EMPTY });
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
  }
});



// ----------------------------List seller Hostels-------------
/**
 * List Hostels
 * This function retrieves a list of hostels owned by a specific seller.
 * @param {Object} req - The HTTP request object containing the seller's ID.
 * @param {Object} res - The HTTP response object to send the list of hostels.
 * @returns {Object} - An object containing the list of hostels belonging to the seller.
 * @throws {Error} - If there's an error during the process, it logs the error and returns an error response with a 500 status code.
 */
const listHostels = asyncHandler(async (req, res) => {
  try {
    // Extract the seller's ID from the request
    const sellerID = req.body.sellerId;

    if (sellerID) {
      // Find hostels associated with the seller's ID
      const listHostels = await Hostel.find({ seller: sellerID });

      // Send a response with the list of hostels
      res.status(200).json({ data: listHostels });
    }
  } catch (error) {
    // Log any errors that occur
    console.log("listHostelAdmin");
    res.status(500).json({
      message: "Hostel List Error",
    });
  }
});


// ----------------------------Edit Hostels Data senting Part-------------
/**
 * Edit Hostel
 * This function retrieves details of a specific hostel based on its ID for editing purposes.
 * @param {Object} req - The HTTP request object containing the hostel's ID.
 * @param {Object} res - The HTTP response object to send the hostel details for editing.
 * @returns {Object} - An object containing the details of the hostel for editing.
 * @throws {Error} - If there's an error during the process, it logs the error.
 */
const editHostel = asyncHandler(async (req, res) => {
  const id = req.body._id;
  try {
    // Find the hostel details based on the provided ID
    const hostelDetails = await Hostel.findOne({ _id: id });

    // Send a response with the hostel details
    res.status(200).json({ data: hostelDetails });
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
});






// ----------------------------editHostel Details Hostel data receiving part-------------
/**
 * Edit Hostel Details
 * This function handles the editing of hostel details, including the ability to update information
 * and images for a specific hostel.
 * @param {Object} req - The HTTP request object containing the updated hostel details and images.
 * @param {Object} res - The HTTP response object to send the updated hostel details or error messages.
 * @returns {Object} - An object indicating whether the hostel details were updated successfully or an error message.
 * @throws {Error} - If there's an error during the process, it logs the error and returns an error response.
 */
const editHostelDetails = asyncHandler(async (req, res) => {
  const formDataObject = req.body;

  try {
    // Check if the request body is empty
    if (!formDataObject) {
      return res.status(400).json({ message: constants.BODY_EMPTY });
    }

    // Find the hostel based on the provided ID
    const hostel = await Hostel.findOne({ _id: formDataObject.id });

    // If the hostel doesn't exist, return an error
    if (!hostel) {
      return res.status(404).json({ message: constants.HOSTEL_NOT_FOUND });
    }

    const editedDetails = {
      seller: formDataObject.sellerID,
      category: formDataObject.category,
      hostelName: formDataObject.hostelName,
      mainLocation: formDataObject.mainLocation,
      description: formDataObject.descriptions,
      fullDetails: formDataObject.fullDetails,
      contactNumber: formDataObject.contactNumber,
      mapLink: formDataObject.mapLink,
      additionalAboutHostel: formDataObject.additionalAboutHostel,
      nearByLocation: formDataObject.nearByLocation,
      restrictions: formDataObject.restrictions,
      descriptionAboutHostel: formDataObject.descriptionAboutHostel,
      guestProfile: formDataObject.guestProfile,
      price: formDataObject.price,
      extraPrice: formDataObject.extraPrice,
      totalBedInRoom: formDataObject.totalBedInRoom,
      bedAvailableNow: formDataObject.bedAvailableNow,
      Wifi: formDataObject.Wifi,
      food: formDataObject.food,
      parking: formDataObject.parking,
      drinkingWater: formDataObject.drinkingWater,
    };

    if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files;
      let fileUrls = [];
      for (let file of uploadedFiles) {
        const filePath = file.filename;
        fileUrls.push(filePath);
      }
      editedDetails.images = fileUrls;
    }

    // Update the hostel document with the edited details
    const updatedHostel = await Hostel.findOneAndUpdate(
      { _id: formDataObject.id },
      editedDetails,
      { new: true } // Return the updated document
    );

    // Check if the hostel was updated successfully and send a response
    if (updatedHostel) {
      return res.status(200).json({
        hostelUpdated: true,
        updatedHostel,
      });
    } else {
      return res
        .status(500)
        .json({ message: constants.FAILED_TO_UPDATE_HOSTEL });
    }
  } catch (error) {
    // Log any errors that occur
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});






// ----------------------------Seller Add Hostel-------------
/**
 * Add Hostel Details
 * This function handles the addition of hostel details, including information and images for a new hostel.
 * @param {Object} req - The HTTP request object containing the new hostel details and images.
 * @param {Object} res - The HTTP response object to send a success message or an error message.
 * @returns {Object} - An object indicating whether the hostel details were added successfully or an error message.
 * @throws {Error} - If there's an error during the process, it logs the error and returns an error response.
 */
const addHostelDetails = asyncHandler(async (req, res) => {
  const formDataObject = req.body;
  // ---------save value to database--------
  try {
    if (!formDataObject) {
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (formDataObject) {
      const hostelData = new Hostel({
        seller: formDataObject.sellerID,
        category: formDataObject.category,
        hostelName: formDataObject.hostelName,
        mainLocation: formDataObject.mainLocation,
        description: formDataObject.descriptions,
        fullDetails: formDataObject.fullDetails,
        contactNumber: formDataObject.contactNumber,
        mapLink: formDataObject.mapLink,
        additionalAboutHostel: formDataObject.additionalAboutHostel,
        nearByLocation: formDataObject.nearByLocation,
        restrictions: formDataObject.restrictions,
        descriptionAboutHostel: formDataObject.descriptionAboutHostel,
        guestProfile: formDataObject.guestProfile,
        price: formDataObject.price,
        extraPrice: formDataObject.extraPrice,
        totalBedInRoom: formDataObject.totalBedInRoom,
        bedAvailableNow: formDataObject.bedAvailableNow,
        Wifi: formDataObject.Wifi,
        food: formDataObject.food,
        parking: formDataObject.parking,
        drinkingWater: formDataObject.drinkingWater,
      });
      if (req.files) {
        const uploadedFiles = req.files;
        let fileUrls = [];
        for (let file of uploadedFiles) {
          const filePath = file.filename;
          fileUrls.push(filePath);
        }
        hostelData.images = fileUrls;
      }
      const hosteldetails = await hostelData.save();

      if (hosteldetails) {
        return res.status(201).json({
          hostelAdded: true,
        });
      }
      if (!hosteldetails) {
        return res
          .status(404)
          .json({ message: constants.INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.BODY_EMPTY });
  }
});





