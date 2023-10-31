import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import cron from "node-cron";
import { Stripe } from "stripe";
// -----------Models
import User from "../../models/UserModels/userModel.js";
import OTP from "../../models/OTPModel.js";
import Wallet from "../../models/UserModels/walletModel.js";
import Hostel from "../../models/SellerModel/HostelModel.js";
import Enquiry from "../../models/UserModels/enquery.js";
import Booking from "../../models/BookHostelModel/BookHostelModel.js";
import HostelReview from "../../models/SellerModel/Review.js";
import genereateToken from "../../utils/generateToken.js";
// ----------Models Ended
import sendReminderEmails from "./sendRemainder.js";
import updateExpiredBookings from "./CRONsetExpire.js";
import constants from "../Constants/constants.js";
import { sendForgetPassword } from "./nodeMailer.js";
import { aggregateBookingWithHostel } from "./aggregateUserBooking.js";


/**
 * Find a Hostel by ID
 * This function is responsible for finding a hostel in the database by its unique ID.
 * @param {string|ObjectID} hostelId - The unique identifier of the hostel to be found.
 * @returns {Promise<Object|boolean>} - If a hostel with the specified ID is found, it returns the hostel object. If no hostel is found, it returns false. In case of an error during the database operation, an error message is logged to the console.
 */
const singleHostelFinding = async (hostelId) => {
  try {
    // Attempt to find a hostel in the database by its unique ID
    const findHostel = await Hostel.findById({ _id: hostelId });

    // Check if a hostel was found
    if (findHostel) {
      // If found, return the hostel object
      return findHostel;
    } else {
      // If no hostel is found, return false
      return false;
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
};
// -------------------Save OTP with UserEmail---------------------------
/**
 * Save or Update OTP (One-Time Password) for a User
 * This function is responsible for saving or updating a One-Time Password (OTP) associated with a user's email address. If an OTP for the email already exists, it is updated. If not, a new OTP is created and saved in the database.
 * @param {string} email - The user's email address.
 * @param {string} otp - The One-Time Password to be saved.
 * @throws {Error} - If an error occurs during the OTP saving process, it is logged.
 */
const OTPsaveFunction = async (email, otp) => {
  try {
    // Check if an OTP for the email already exists
    const existingOTP = await OTP.findOne({ email });
    
    if (existingOTP) {
      // If an OTP already exists, delete it to update with the new OTP
      await OTP.deleteOne({ email });
    }

    // Create a new OTP object
    const saveOTP = new OTP({
      email: email,
      otp: otp,
    });

    // Save the OTP to the database
    const OTPsaved = await saveOTP.save();
    return;
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error.message);
  }
};

// -------------------User Authentication---------------------------
/**
 * Authenticate User
 * This function is responsible for authenticating a user by checking their email and password. It also handles user blocking and generates a token upon successful authentication.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Find the user in the database by their email
  const user = await User.findOne({ email });

  if (!user) {
    // If no user is found, respond with an error message and status code
    res.status(401).json({
      message: constants.EMAIL_PASSWORD_INCORRECT,
    });
    throw new Error(constants.EMAIL_PASSWORD_INCORRECT);
  }

  if (user.isBlock) {
    // If the user is blocked, respond with an error message and status code
    return res.status(401).json({ message: constants.USER_BLOCKED });
  }

  if (user && (await user.matchPassword(password))) {
    // If the password matches, generate a token and respond with user data
    genereateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If the password doesn't match, respond with an error message and status code
    res.status(401);
    throw new Error(constants.EMAIL_PASSWORD_INCORRECT);
  }
});


// -------------------Register New User with wallet function---------------------------
/**
 * Create a New User with Wallet
 * This function is responsible for creating a new user in the system and associating a wallet with the user.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} mobile - The user's mobile number.
 * @returns {Promise<Object>} - Returns the user registration object, including the user's details and associated wallet.
 */
const createNewUserWithWallet = async (name, email, password, mobile) => {
  try {
    // Create a new user with the provided details
    const userRegistration = await User.create({
      name,
      email,
      password,
      mobile,
    });
    
    // Create a wallet for the user
    const wallet = await Wallet.create({
      user_id: userRegistration._id,
    });

    // Update the user's record with the wallet ID
    await User.updateOne(
      { _id: userRegistration._id },
      { wallet_id: wallet._id }
    );
    
    // Return the user registration object
    return userRegistration;
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
};


// -------------------Register New User---------------------------
/**
 * Register a New User
 * This function is responsible for registering a new user in the system. It checks if the user already exists, and if not, it creates a new user with an associated wallet and generates a token for the user's authentication.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const registerUser = asyncHandler(async (req, res) => {
  try {
    // Extract user registration details from the request body
    const { userName, email, password, mobile } = req.body;
    
    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // If the user already exists, respond with an error message and status code
      res.status(400).json({ message: constants.USER_ALREADY_EXIST });
      return;
    }

    // Create a new user with an associated wallet
    const user = await createNewUserWithWallet(
      userName,
      email,
      password,
      mobile
    );

    if (user) {
      // If the user is successfully registered, generate a token and respond with user data
      genereateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      // If there's an issue during user registration, respond with an error message and status code
      res.status(401).json({ message: constants.USER_ALREADY_EXIST });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});


// -------------------Forget Password User Verification---------------------------
/**
 * Handle Forget Password Request
 ** This function is responsible for handling a forget password request. It checks if the user with the provided email exists, generates a one-time password (OTP) for password reset, sends it to the user via email, and saves it in the database.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const forget = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  // Check if a user with the provided email exists
  const user = await User.findOne({ email: email });

  if (!user) {
    // If the user doesn't exist, respond with an error message and status code
    return res.status(401).json({
      message: constants.INVALID_EMAIL,
    });
  }

  if (user) {
    // Generate a random OTP for password reset
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);
    
    // Send the OTP to the user via email
    sendForgetPassword(user.name, user.email, OTPgenerated);
    
    // Save the OTP in the database
    const saveOrNot = await OTPsaveFunction(user.email, OTPgenerated);
    
    // Log the generated OTP for debugging (consider removing in production)
    console.log(OTPgenerated);
    
    // Respond with the user's email as a confirmation
    return res.json({
      email,
    });
  }
});

// -----------------------------Verify OTP ---------------------------
/**
 * Verify One-Time Password (OTP)
 ** This function is responsible for verifying a One-Time Password (OTP) entered by the user. It checks if the provided OTP matches the OTP stored in the database for the given email.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const verifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = req.body.enteredOTP;

  try {
    // Find the OTP associated with the provided email
    const user = await OTP.findOne({ email });

    if (!user) {
      // If no OTP is found for the email, respond with an error message
      return res.json({ message: constants.OTP_EXPIRED });
    }

    if (user) {
      // Convert entered OTP to a number for comparison
      const enterOTP = parseInt(otp);
      // Convert OTP from the database to a number for comparison
      const databaseOTP = parseInt(user.otp);

      if (enterOTP !== databaseOTP) {
        // If entered OTP does not match the stored OTP, respond with an error message and status code
        return res.status(401).json({ message: constants.INVALID_OTP });
      }

      if (enterOTP === databaseOTP) {
        // If entered OTP matches the stored OTP, respond with the user's email
        return res.json({ user: user.email });
      }
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error.message);
  }
});




// ----------------------------Reset Password-------------
/**
 * Reset User Password
 * This function is responsible for resetting a user's password. It looks up the user by their email, updates their password, and responds with the appropriate status and message.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: userId });

    if (!user) {
      // If no user is found, respond with a status code and an error message
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (user) {
      // Update the user's password
      user.password = password;
      await user.save();
      
      // Respond with a success message
      res.status(200).json({ message: constants.PASSWORD_RESET_SUCCESSFULLY });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});




// ----------------------------FindAccommodation-------------
/**
 * Find Accommodations
 ** This function is responsible for finding accommodations (hostels) that are not blocked. It retrieves a list of hostels from the database and responds with the data if found.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const findAccommodation = asyncHandler(async (req, res) => {
  try {
    // Find hostels that are not blocked
    const hostels = await Hostel.find({ isBlock: { $ne: true } });

    if (!hostels) {
      // If no hostels are found, respond with a status code and an error message
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (hostels) {
      // If hostels are found, respond with the data
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});




// ----------------------------High to Low sorting-------------
/**
 * Find High-Priced Accommodations
 ** This function is responsible for finding high-priced accommodations (hostels) that are not blocked. It retrieves a list of hostels from the database and sorts them by price in descending order, responding with the data if found.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const high = asyncHandler(async (req, res) => {
  try {
    // Find hostels that are not blocked and sort them by price in descending order
    const hostels = await Hostel.find({ isBlock: { $ne: true } }).sort({
      price: -1,
    });

    if (!hostels) {
      // If no high-priced hostels are found, respond with a status code and an error message
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (hostels) {
      // If high-priced hostels are found, respond with the data
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});



// ----------------------------Low to High sorting-------------
/**
 * Find Low-Priced Accommodations
 ** This function is responsible for finding low-priced accommodations (hostels) that are not blocked. It retrieves a list of hostels from the database and sorts them by price in ascending order, responding with the data if found.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const low = asyncHandler(async (req, res) => {
  try {
    // Find hostels that are not blocked and sort them by price in ascending order
    const hostels = await Hostel.find({ isBlock: { $ne: true } }).sort({
      price: 1,
    });

    if (!hostels) {
      // If no low-priced hostels are found, respond with a status code and an error message
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (hostels) {
      // If low-priced hostels are found, respond with the data
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});


// ----------------------------Search using Regex-------------
/**
 * Search for Accommodations
 ** This function is responsible for searching and retrieving accommodations (hostels) based on search criteria. It filters hostels that are not blocked and match the search criteria, including hostel name, category, and full details.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const search = asyncHandler(async (req, res) => {
  try {
    // Extract the search value from the query parameters
    const searchValue = req.query.search;

    // Find hostels that are not blocked and match the search criteria
    let hostels = await Hostel.find({
      $and: [
        { isBlock: { $ne: true } }, // Exclude blocked hostels
        {
          $or: [
            { hostelName: { $regex: new RegExp(searchValue, "i") } },
            { category: { $regex: new RegExp(searchValue, "i") } },
            { fullDetails: { $regex: new RegExp(searchValue, "i") } },
          ],
        },
      ],
    });

    if (!hostels) {
      // If no matching hostels are found, respond with a status code and an error message
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (hostels) {
      // If matching hostels are found, respond with the data
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});






// ----------------------------singlePageView hostel-------------
/**
 * View Single Hostel Page
 ** This function is responsible for viewing a single hostel's page. It retrieves information about the specified hostel, its reviews, and the user's wallet balance (if available).
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const singlePageView = asyncHandler(async (req, res) => {
  try {
    // Initialize user wallet amount as 0
    let userWalletAmount = 0;

    // Find the specified hostel by its ID
    const hostel = await Hostel.find({ _id: req.body.id });

    // Find reviews for the specified hostel
    const review = await HostelReview.find({ hostel: req.body.id });

    // Find the user's wallet balance, if available
    const wallet = await Wallet.findOne({ user_id: req.body.user_id });

    if (wallet) {
      userWalletAmount = wallet.balance;
    }

    if (!hostel) {
      // If the specified hostel is not found, respond with a status code and an error message
      return res.status(404).json({ message: constants.INTERNAL_SERVER_ERROR });
    }

    if (hostel) {
      // If the hostel is found, construct the response data and respond with it
      const responseData = {
        data: hostel,
        review: review || null,
        userWallet: userWalletAmount,
      };
      res.status(200).json(responseData);
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});





// ----------------------------Stripe Booking-------------
/**
 * Book Hostel
 * This function is responsible for initiating a hostel booking by creating a session with Stripe for payment processing.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const bookHostel = asyncHandler(async (req, res) => {
  try {
    const { userId, hostel } = req.body;
    
    // Fetch your Stripe API key from environment variables
    const key = process.env.STRIPE_KEY;
    
    // Create a Stripe instance using the API key
    const stripe = new Stripe(key);
    
    // Create a checkout session for payment using Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: hostel.hostelName,
            },
            // unit_amount: hostel.price * 100,
            unit_amount: 10 * 100, // Replace with the actual price * 100
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/bookingConfirmation?userId=${userId}&hostel=${hostel._id}`,
      cancel_url: `http://localhost:3000/login`,
    });
    
    // Respond with the session ID created by Stripe
    res.json({ id: session.id });
  } catch (error) {
    // Handle errors, such as Stripe API issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});


// ----------------------------Conform Booking -------------
/**
 * Booking Confirmation
 ** This function is responsible for confirming a booking, updating hostel data, and creating a booking record in the database.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const bookingConfirmation = asyncHandler(async (req, res) => {
  const { userId, hostelId } = req.query;

  try {
    // Find the hostel data by ID
    const hostelDatas = await singleHostelFinding(hostelId);

    // Extract relevant data from the hostel
    let price = parseFloat(hostelDatas.price);
    let extraPrice = parseFloat(hostelDatas.extraPrice);
    let sellerId = hostelDatas.seller;
    let totalAmount = price + extraPrice;
    hostelDatas.bedAvailableNow--;

    // Save the updated hostel data
    await hostelDatas.save();

    if (userId && hostelId) {
      // Calculate the expiration date (e.g., 30 days from now)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      // Create a booking record
      const conformBooking = new Booking({
        user: userId,
        userEmail: req.user.email,
        userName: req.user.name,
        status: "confirmed",
        hostel: hostelId,
        seller: sellerId,
        date: new Date(),
        totalAmount: totalAmount,
        paymentMethod: "Card",
        paymentVia: "Stripe",
        expirationDate: thirtyDaysFromNow,
      });

      // Save the booking record to the database
      const booked = await conformBooking.save();

      if (booked) {
        // Respond with booking confirmation details
        res.status(200).json({
          bookingCompleted: true,
          hostelData: hostelDatas,
          bookedDetails: booked,
        });
      } else {
        // Respond with a booking failure message
        res.status(404).json({ bookingCompleted: false });
      }
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});





// ----------------------------Wallet Booking -------------
/**
 * Wallet Confirmation
 * This function is responsible for confirming a booking using a user's wallet, updating the user's wallet balance, updating hostel data, and creating a booking record in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const WalletConfirmation = asyncHandler(async (req, res) => {
  try {
    const { hostelId, userId, hostelTotalPrice } = req.body;

    // Update the user's wallet balance by deducting the hostel total price
    await Wallet.findOneAndUpdate(
      { user_id: userId },
      { $inc: { balance: -Number(hostelTotalPrice) } },
      { new: true }
    );

    // Find the hostel data by ID
    const hostelDatas = await singleHostelFinding(hostelId);

    // Extract relevant data from the hostel
    let price = parseFloat(hostelDatas.price);
    let extraPrice = parseFloat(hostelDatas.extraPrice);
    let sellerId = hostelDatas.seller;
    let totalAmount = price + extraPrice;
    hostelDatas.bedAvailableNow--;

    // Save the updated hostel data
    await hostelDatas.save();

    if (userId && hostelId) {
      // Create a booking record
      const conformBooking = new Booking({
        user: userId,
        status: "confirmed",
        hostel: hostelId,
        seller: sellerId,
        date: new Date(),
        totalAmount: totalAmount,
        paymentMethod: "Wallet",
        paymentVia: "Wallet",
      });

      // Save the booking record to the database
      const booked = await conformBooking.save();

      if (booked) {
        // Respond with booking confirmation details
        res.status(200).json({
          bookingCompleted: true,
          hostelId: hostelId,
          userId: userId,
        });
      } else {
        // Respond with a booking failure message
        res.status(404).json({ bookingCompleted: false });
      }
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});





// ----------------------------user mY booking-------------
/**
 * Make Enquiry
 ** This function is responsible for allowing a user to make an enquiry for a hostel. It creates an enquiry record in the database with user details and the enquiry message.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const makeEnquery = asyncHandler(async (req, res) => {
  try {
    // Extract data from the request body
    const { formData, hostelId, sellerId } = req.body;

    if (hostelId && formData) {
      // Create a new enquiry record with user details and the enquiry message
      const newEnquiry = new Enquiry({
        user: req.user._id,
        hostel: hostelId,
        seller: sellerId,
        name: req.user.name,
        email: req.user.email,
        message: formData.message,
        userRequest: "pending",
      });

      // Save the new enquiry record to the database
      await newEnquiry.save();

      // Respond with a success message
      res.status(200).json({ updated: true, message: constants.ENQUIRY_SUCCESSFULLY });
    } else {
      // If required data is missing, respond with an error message
      return res.status(404).json({ message: constants.PLEASE_LOGIN });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
});




// ----------------------------Enquery listing-------------
/**
 * List User Enquiry Replies
 ** This function is responsible for listing enquiries made by the user and their replies, if available.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const listEnqueryReplyUser = asyncHandler(async (req, res) => {
  try {
    // Find enquiries made by the user
    const userEnquiry = await Enquiry.find({ user: req.user._id });

    if (userEnquiry) {
      // If user enquiries are found, respond with the data
      res.status(200).json({ enquiry: true, userEnquiry: userEnquiry });
    } else {
      // If no user enquiries are found, respond with a message
      res.status(400).json({ message: constants.NO_ENQUIRY });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.log(error);
  }
});




// ----------------------------USER mY booking-------------
/**
 * My Bookings
 * This function is responsible for retrieving booking details for a specific user based on their user ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const myBookings = asyncHandler(async (req, res) => {
  const userId = req.query.token;

  // Call the aggregateBookingWithHostel function to retrieve booking details
  const response = await aggregateBookingWithHostel(userId);

  try {
    if (response) {
      // If booking details are found, respond with the data
      return res.status(200).json({
        allDetails: response,
      });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});


// ----------------------------Get user Rating-------------
/**
 * Get Booking Rating
 ** This function is responsible for retrieving the rating value for a specific booking based on the booking ID.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getRating = asyncHandler(async (req, res) => {
  try {
    // Find the user's booking by its ID
    const userBooking = await Booking.findById({
      _id: req.query.bookingId.bookingId,
    });

    if (userBooking) {
      // If the booking is found, respond with the rating value
      return res.status(200).json({ updated: true, ratingValue: userBooking.rating });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.log(error);
  }
});


// ----------------------------user Rating -------------
/**
 * User Rating
 * This function is responsible for allowing a user to submit a rating for a specific booking, updating the booking's rating value, and updating the corresponding hostel's rating.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const userRating = asyncHandler(async (req, res) => {
  try {
    // Update the booking's rating value based on the booking ID
    const userBooking = await Booking.findOneAndUpdate(
      { _id: req.query.bookingId.bookingId },
      { $set: { rating: Number(req.body.rating) } },
      { new: true }
    );

    // Update the corresponding hostel's rating by incrementing it with the new rating value
    const hostel = await Hostel.findOneAndUpdate(
      { _id: userBooking.hostel },
      { $inc: { rating: Number(req.body.rating) } },
      { new: true }
    );

    if (userBooking) {
      // If the rating update is successful, respond with the updated rating value
      return res.status(200).json({ updated: true, ratingValue: userBooking.rating });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.log(error);
    return res.status(400).json(error);
  }
});





// ----------------------------user Cancel booking-------------
/**
 * Cancel Booking
 * This function is responsible for allowing a user to cancel a booking, updating the booking's status, updating hostel bed availability, and performing wallet transactions.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the booking to be canceled by its ID
    const cancelUpdate = await Booking.findOne({ _id: id });

    // Update the booking's status to "cancelled"
    cancelUpdate.status = "cancelled";
    cancelUpdate.cancelled = true;

    // Get the ID of the corresponding hostel
    const hostelId = cancelUpdate.hostel;

    // Update the hostel's bed availability by incrementing it
    await Hostel.findOneAndUpdate(
      { _id: hostelId },
      { $inc: { bedAvailableNow: 1 } },
      { new: true }
    );

    // Save the updated booking status
    const i = await cancelUpdate.save();

    if (cancelUpdate) {
      // Find the user's wallet to update the balance
      const userWallet = await Wallet.findOne({ user_id: cancelUpdate.user });

      // Increment the user's wallet balance with the booking's total amount
      userWallet.balance = userWallet.balance + cancelUpdate.totalAmount;

      // Create a new transaction record
      const newTransaction = {
        closing_balance: userWallet.balance,
        booking_date: new Date(),
        booking_id: new mongoose.Types.ObjectId(cancelUpdate._id),
        booking_amount: cancelUpdate.totalAmount,
      };

      // Push the new transaction to the user's wallet transactions array
      userWallet.transactions.push(newTransaction);

      // Save the updated user wallet
      const updated = await userWallet.save();

      if (updated) {
        // If the cancellation and wallet updates are successful, respond with a success message
        return res.status(200).json({ is_modified: true, message: constants.HOSTEL_CANCELLATION_SUCCESSFULLY });
      } else {
        // If there is an issue with updating the wallet, respond with an error message
        return res.status(400).json({ message: constants.INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});


// ---------------------------Add Reviews ---------------------------
/**
 * Add Review
 ** This function is responsible for allowing a user to add a review for a hostel, including the review's content and optionally uploaded images.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const addReview = asyncHandler(async (req, res) => {
  const { userId, hostelId, description } = req.body;
  try {
    // Create a new HostelReview object with user, hostel, and review content
    const review = new HostelReview({
      user: userId,
      hostel: hostelId,
      content: description,
    });

    // Check if there are uploaded files (images)
    if (req.files) {
      const uploadedFiles = req.files;
      let fileUrls = [];
      // Extract file URLs from the uploaded files and add them to the review
      for (let file of uploadedFiles) {
        const filePath = file.filename;
        fileUrls.push(filePath);
      }
      review.images = fileUrls;
    }

    // Save the review to the database
    const hostelReviewAdded = await review.save();

    if (!hostelReviewAdded) {
      // If there is an issue with adding the review, respond with an error message
      return res.status(404).json({ review: false, message: constants.INTERNAL_SERVER_ERROR });
    }

    if (hostelReviewAdded) {
      // If the review is successfully added, respond with a success message
      return res.status(200).json({ review: true, message: constants.REVIEW_ADDING_SUCCESSFULLY });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});



// ---------------------------Aggregate with wallet ---------------------------
/**
 * User Profile with Wallet Aggregation
 ** This function aggregates user profile information with their associated wallet details.
 ** @param {string} userId - The user's ID for which the profile and wallet information will be aggregated.
 * @returns {Object} - Aggregated user profile and wallet information.
 */
const userProfileWithWalletAggregate = asyncHandler(async (userId) => {
  try {
    // Aggregate user data by matching the provided user ID
    const result = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "wallets",
          localField: "wallet_id",
          foreignField: "_id",
          as: "wallet",
        },
      },
      {
        $unwind: "$wallet",
      },
    ]);

    return result;
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});






// ---------------------------Get User Profile---------------------------

/**
 * Get User Profile
 ** This function is responsible for retrieving a user's profile information, including their associated wallet details, based on the provided user ID.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    // Call the userProfileWithWalletAggregate function to aggregate user profile with wallet details
    userProfileWithWalletAggregate(req.query.userId)
      .then((value) => {
        if (value) {
          // If user data is found, respond with the user's profile and wallet information
          return res.status(200).json({ userData: value });
        }
      })
      .catch((error) => {
        // Handle errors, such as user not found
        console.error(error);
        return res.status(404).json({ message: constants.USER_NOT_FOUND });
      });
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});





// ---------------------------Update User Profile---------------------------
/**
 * Update User Profile
 ** This function is responsible for updating a user's profile information, including name, email, mobile, and password, based on the provided user ID.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.query.userId);

    if (user) {
      // Update user properties with the values from the request body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      user.pic = req.body.image || user.pic;

      // Check if a new password is provided, and if so, update the user's password
      if (req.body.password) {
        user.password = req.body.password;
      }

      // Save the updated user profile
      const updatedUser = await user.save();

      res.status(200).json({
        updated: true,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        image: updatedUser.pic,
      });
    } else {
      // If the user is not found, respond with an error message
      res.status(404);
      throw new Error(constants.USER_NOT_FOUND);
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error(error);
  }
});

try {
  // Schedule a CRON job to run daily at midnight (0 0 * * *)
  cron.schedule("0 0 * * *", () => {
    console.log("CRON Checking");

    // Call a function to send reminder emails
    sendReminderEmails();

    // Call a function to update expired bookings
    updateExpiredBookings();

    console.log("Scheduled task: Reminder emails sent.");
  });
} catch (error) {
  // Handle any errors that may occur during CRON job scheduling
  console.log(error);
}

// --------------------------Logout clearing JWT---------------------------
/**
 * Logout User
 ** This function is responsible for logging out a user by clearing their JWT cookie and sending a success message.
 ** @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const logoutUser = asyncHandler(async (req, res) => {
  console.log("logout");

  // Clear the JWT cookie by setting it to an empty value and expiring it immediately
  res.cookie("jwt_User", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false, // Set to true if you're using HTTPS
    sameSite: "none", // Set to "none" for cross-site cookies
  });

  // Respond with a success message indicating that the user has been logged out
  res.status(200).json({ message: constants.USER_LOGOUT_SUCCESSFULLY });
});



export {
  authUser,
  registerUser,
  logoutUser,
  forget,
  getUserProfile,
  updateUserProfile,
  verifyOTP,
  resetPassword,
  findAccommodation,
  high,
  low,
  search,
  singlePageView,
  bookHostel,
  bookingConfirmation,
  WalletConfirmation,
  myBookings,
  getRating,
  userRating,
  makeEnquery,
  listEnqueryReplyUser,
  cancelBooking,
  addReview,
};
