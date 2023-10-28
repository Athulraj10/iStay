import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
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
import nodemailer from "nodemailer";
import  cron from 'node-cron'
import { Stripe } from "stripe";
import {
  sessionSecret,
  emailUser,
  NewAppPassword,
} from "../../config/config.js";
import sendReminderEmails from "./sendRemainder.js";

//@desc forgetOTP
//access Public
//route POST// users/forget
// -------------------------SENT OTP NodeMailer---------------------------------------
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
        console.error(error);
      } else {
        console.error("email successfully", info.response);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

const singleHostelFinding = async (hostelId) => {
  try {
    const findHostel = await Hostel.findById({ _id: hostelId });
    if (findHostel) {
      return findHostel;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
const aggregateBookingWithHostel = async (userId) => {
  try {
    const result = await Booking.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
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
          from: "sellers",
          localField: "hostelDetails.seller",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $unwind: "$sellerDetails",
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          cancelled: { $first: "$cancelled" },
          hostel: { $first: "$hostel" },
          paymentMethod: { $first: "$paymentMethod" },
          paymentVia: { $first: "$paymentVia" },
          totalAmount: { $first: "$totalAmount" },
          hostelDetails: { $first: "$hostelDetails" },
          sellerDetails: { $first: "$sellerDetails" },
        },
      },
      // {
      //   $sort: {
      //     createdAt: -1, // Sort by lastUpdated field in descending order (latest first)
      //   },
      // }
    ]);
    return result;
  } catch (error) {
    console.error(error);
  }
};
// const userProfile = asyncHandler(async(req,res)=>{
//   try {
//     const token = req.headers.authorization; // Get the token from the request header

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Verify the token
//   jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token is invalid' });
//     }

//     // Token is valid, you can access the user data from decoded
//     const userData = decoded;

//     // Do something with userData, e.g., retrieve the user profile
//     res.json({ message: 'User profile retrieved', user: userData });
//   });

//   } catch (error) {
//     console.error(error)
//   }
// })

// async function getUserBookings(userId) {
//   return new Promise((resolve, reject) => {
//     Booking.aggregate([
//       {
//         $match: {
//           user: new ObjectId(userId)
//         }
//       },
//       {
//         $lookup: {
//           from: 'User', // Replace with the actual collection name for users
//           localField: 'user',
//           foreignField: '_id',
//           as: 'user'
//         }
//       },
//       {
//         $lookup: {
//           from: 'Hostel', // Replace with the actual collection name for hostels
//           localField: 'hostel',
//           foreignField: '_id',
//           as: 'hostel'
//         }
//       }
//     ]).exec((err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }

// -------------------Save OTP with UserEmail---------------------------
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
    console.error(error.message);
  }
};
// -------------------User Authentication---------------------------
//@desc Auth user/set token
//access Public
//route POST// /api/users
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Invalid Email or Password",
    });
    throw new Error("Invalid Email or Password");
  }
  if (user.isBlock) {
    return res.status(401).json({ message: "User Is Blocked" });
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
// -------------------Register New User with wallet function---------------------------
const createNewUserWithWallet = async (name, email, password, mobile) => {
  try {
    const userRegistration = await User.create({
      name,
      email,
      password,
      mobile,
    });
    const wallet = await Wallet.create({
      user_id: userRegistration._id,
    });

    await User.updateOne(
      { _id: userRegistration._id },
      { wallet_id: wallet._id }
    );
    return userRegistration;
  } catch (error) {
    console.log(error);
  }
};
// -------------------Register New User---------------------------
//@desc createing new  user
//access Public
//route POST// /api/register
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password, mobile } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User Already Exists" });
      return;
    }

    const user = await createNewUserWithWallet(
      userName,
      email,
      password,
      mobile
    );

    if (user) {
      genereateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "User creation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// -------------------Forget Password User Verification---------------------------
//@desc Auth user/set token
//access Public
//route POST// /api/users
const forget = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }
  if (user) {
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);
    sendForgetPassword(user.name, user.email, OTPgenerated);
    console.log(OTPgenerated);
    const saveOrNot = await OTPsaveFunction(user.email, OTPgenerated);
    return res.json({
      email,
    });
  }
});
// -----------------------------Verify OTP ---------------------------
const verifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = req.body.enteredOTP;
  try {
    const user = await OTP.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid Expired" });
    }
    if (user) {
      const enterOTP = parseInt(otp);
      const databaseOTP = parseInt(user.otp);
      if (enterOTP !== databaseOTP) {
        return res.status(401).json({ message: "Invalid OTP" });
      }
      if (enterOTP === databaseOTP) {
        return res.json({ user: user.email });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});
// ----------------------------Reset Password-------------
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (user) {
      user.password = password;
      await user.save();
      res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------FindAccommodation-------------
const findAccommodation = asyncHandler(async (req, res) => {
  try {
    const hostels = await Hostel.find({ isBlock: { $ne: true } });

    if (!hostels) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (hostels) {
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------FindAccommodation-------------
const high = asyncHandler(async (req, res) => {
  try {
    const hostels = await Hostel.find({ isBlock: { $ne: true } }).sort({
      price: -1,
    });

    if (!hostels) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (hostels) {
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
const low = asyncHandler(async (req, res) => {
  try {
    const hostels = await Hostel.find({ isBlock: { $ne: true } }).sort({
      price: 1,
    });

    if (!hostels) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (hostels) {
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
const search = asyncHandler(async (req, res) => {
  try {
    const searchValue = req.query.search;
    let hostels = await Hostel.find({
      $and: [
        { isBlock: { $ne: true } }, // Exclude blocked hostels
        {
          $or: [
            { hostelName: { $regex: new RegExp(searchValue, "i") } },
            { hostelName: { $regex: new RegExp(searchValue, "i") } },
            { category: { $regex: new RegExp(searchValue, "i") } },
            { category: { $regex: new RegExp(searchValue, "i") } },
            { fullDetails: { $regex: new RegExp(searchValue, "i") } },
            { fullDetails: { $regex: new RegExp(searchValue, "i") } },
          ],
        },
      ],
    });
    if (!hostels) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (hostels) {
      res.status(200).json({ data: hostels });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------singlePageView hostel-------------
const singlePageView = asyncHandler(async (req, res) => {
  try {
    let userWalletAmount = 0;
    const hostel = await Hostel.find({ _id: req.body.id });
    const review = await HostelReview.find({ hostel: req.body.id });
    const wallet = await Wallet.findOne({ user_id: req.body.user_id });

    if (wallet) {
      userWalletAmount = wallet.balance;
    }
    if (!hostel) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (hostel) {
      const responseData = {
        data: hostel,
        review: review || null,
        userWallet: userWalletAmount,
      };
      res.status(200).json(responseData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------singlePageView hostel-------------
const bookHostel = asyncHandler(async (req, res) => {
  try {
    const { userId, hostel } = req.body;
    const key = process.env.STRIPE_KEY;
    const stripe = new Stripe(key);
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
            unit_amount: 10 * 100,
          },
          quantity: 1,
        },
      ],
      // success_url: `http://localhost:3000/bookingConfirmation?details=${details}`,
      success_url: `http://localhost:3000/bookingConfirmation?userId=${userId}&hostel=${hostel._id}`,
      cancel_url: `http://localhost:3000/login`,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// ----------------------------Stripe Booking -------------
const bookingConfirmation = asyncHandler(async (req, res) => {
  const { userId, hostelId } = req.query;
  try {
    const hostelDatas = await singleHostelFinding(hostelId);
    let price = parseFloat(hostelDatas.price);
    let extraPrice = parseFloat(hostelDatas.extraPrice);
    let sellerId = hostelDatas.seller;
    let totalAmount = price + extraPrice;
    hostelDatas.bedAvailableNow--;
    await hostelDatas.save();

    if (userId && hostelId) {
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
      });
      const booked = await conformBooking.save();
      if (booked) {
        res.status(200).json({
          bookingCompleted: true,
          hostelData: hostelDatas,
          bookedDetails: booked,
        });
      } else {
        res.status(404).json({ bookingCompleted: false });
      }
    }
  } catch (error) {
    console.error(error);
  }
});
// ----------------------------Wallet Booking -------------
const WalletConfirmation = asyncHandler(async (req, res) => {
  try {
    const { hostelId, userId, hostelTotalPrice } = req.body;
    await Wallet.findOneAndUpdate(
      { user_id: req.body.userId },
      { $inc: { balance: -Number(hostelTotalPrice) } },
      { new: true }
    );
    const hostelDatas = await singleHostelFinding(hostelId);
    let price = parseFloat(hostelDatas.price);
    let extraPrice = parseFloat(hostelDatas.extraPrice);
    let sellerId = hostelDatas.seller;
    let totalAmount = price + extraPrice;
    hostelDatas.bedAvailableNow--;
    await hostelDatas.save();

    if (userId && hostelId) {
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
      const booked = await conformBooking.save();
      if (booked) {
        res.status(200).json({
          bookingCompleted: true,
          hostelId: hostelId,
          userId: userId,
        });
      } else {
        res.status(404).json({ bookingCompleted: false });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// ----------------------------user mY booking-------------
const makeEnquery = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { formData, hostelId, sellerId } = req.body;
    if (hostelId && formData) {
      const newEnquiry = new Enquiry({
        user: req.user._id,
        hostel: hostelId,
        seller: sellerId,
        name: req.user.name,
        email: req.user.email,
        message: formData.message,
        userReques: "pending",
      });
      await newEnquiry.save();
      res
        .status(200)
        .json({ updated: true, message: "Enquiry Successfully Sended." });
    } else {
      return res
        .status(404)
        .json({ message: "Something went wrong, please login again." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ----------------------------Enquery listing-------------
const listEnqueryReplyUser = asyncHandler(async (req, res) => {
  try {
    const userEnquery = await Enquiry.find({ user: req.user._id });
    if (userEnquery) {
      res.status(200).json({ enquery: true, userEnquery: userEnquery });
    } else {
      res.status(400).json({ message: "No Enquery" });
    }
  } catch (error) {
    console.log(error);
  }
});

// ----------------------------user mY booking-------------
const myBookings = asyncHandler(async (req, res) => {
  const userId = req.query.token;
  const response = await aggregateBookingWithHostel(userId);
  try {
    if (response) {
      return res.status(200).json({
        allDetails: response,
      });
    }
  } catch (error) {
    console.error(error);
  }
});
const getRating = asyncHandler(async(req,res)=>{
  try {
    const userBooking = await Booking.findById(
      { _id: req.query.bookingId.bookingId } );
    if (userBooking) {
      return res.status(200).json({ updated:true,ratingValue: userBooking.rating });
    }  
  } catch (error) {
    console.log(error)
  }
})
const userRating = asyncHandler(async (req, res) => {
  try {
    const userBooking = await Booking.findOneAndUpdate(
      { _id: req.query.bookingId.bookingId },
      { $set: { rating: Number(req.body.rating) } },
      { new: true }
    );
    const hostel = await Hostel.findOneAndUpdate(
      {_id:userBooking.hostel},
      { $inc: { rating: Number(req.body.rating) } },
      {new:true}
    )
    if (userBooking) {
      return res.status(200).json({ updated:true,ratingValue: userBooking.rating });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});
// ----------------------------user Cancell booking-------------
const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const cancel_update = await Booking.findOne({ _id: id });
    cancel_update.status = "cancelled";
    cancel_update.cancelled = true;
    const hostelId = cancel_update.hostel;
    await Hostel.findOneAndUpdate(
      { _id: hostelId },
      { $inc: { bedAvailableNow: 1 } },
      { new: true }
    );
    const i = await cancel_update.save();
    if (cancel_update) {
      const userWallet = await Wallet.findOne({ user_id: cancel_update.user });
      userWallet.balance = userWallet.balance + cancel_update.totalAmount;
      const newTransaction = {
        closing_balance: userWallet.balance,
        booking_date: new Date(),
        booking_id: new mongoose.Types.ObjectId(cancel_update._id),
        booking_amount: cancel_update.totalAmount,
      };
      userWallet.transactions.push(newTransaction);
      const updated = await userWallet.save();
      if (updated) {
        return res
          .status(200)
          .json({ is_modified: true, message: "Hostel Cancel Successfully" });
      } else {
        return res.status(400).json({ message: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { userId, hostelId, description } = req.body;
  try {
    const review = new HostelReview({
      user: userId,
      hostel: hostelId,
      content: description,
    });
    if (req.files) {
      const uploadedFiles = req.files;
      let fileUrls = [];
      for (let file of uploadedFiles) {
        const filePath = file.filename;
        fileUrls.push(filePath);
      }
      review.images = fileUrls;
    }
    const hostelReviewAdded = await review.save();
    if (!hostelReviewAdded) {
      return res.status(404).json({ review: false, message: "Internal Error" });
    }
    if (hostelReviewAdded) {
      return res
        .status(200)
        .json({ review: true, message: "Review Added Successfully" });
    }
  } catch (error) {
    console.error(error);
  }
});
// ---------------------------Aggregate with wallet ---------------------------
const userProfileWithWalletAggregate = asyncHandler(
  asyncHandler(async (userId) => {
    try {
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
      console.error(error);
    }
  })
);
// ---------------------------Get User Profile---------------------------
//@desc get user profile
//access Private
//route POST// /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    userProfileWithWalletAggregate(req.query.userId)
      .then((value) => {
        if (value) {
          return res.status(200).json({ userData: value });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(404).json({ message: "User Fetching Error" });
      });
    // if (userDetails) {
    //   return res.status(200).json({ message: "User profile", userDetails });
    // } else {
    //   return res.status(404).json({ message: "No User Found" });
    // }
  } catch (error) {
    console.error(error);
  }
});
// ---------------------------Update User Profile---------------------------
//@desc get update user profile
//access Private
//route PUT// /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.email;
    user.pic = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    console.log(updatedUser)
    res.status(200).json({
      updated: true,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      image: updatedUser.pic,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// async function sendReminderEmails() {
//   try {
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 1);

//     const bookings = await Booking.find({
//       date: { $lte: thirtyDaysAgo },
//       notified: false,
//     });
//     // Send reminder emails
//     bookings.forEach(async (booking) => {
//       const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: booking.userEmail,
//         subject: 'Reminder: Your Booking',
//         text: 'This is a reminder for your booking made 30 days ago.',
//       };

//       await transporter.sendMail(mailOptions);
//       booking.notified = true;
//       await booking.save();
//     });
//   } catch (error) {
//     console.error('Error sending reminder emails:', error);
//   }
// }
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: emailUser, // Use environment variables or config for email credentials
    pass: NewAppPassword, // Use environment variables or config for email credentials
  },
});
// Function to send reminder emails

try {
  cron.schedule('* * * * *', () => {
    console.log('CRON Cheaking');
    sendReminderEmails();
    console.log('Scheduled task: Reminder emails sent.');
  });
} catch (error) {
  console.log(error)
}

// --------------------------Logout clearing JWT---------------------------
//@desc logout USer
//access Public
//route POST// /api/logout
const logoutUser = asyncHandler(async (req, res) => {
  console.log("logout");
  res.cookie("jwt_User", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false, // Set to true if you're using HTTPS
    sameSite: "none", // Set to "none" for cross-site cookies
  });

  res.status(200).json({ message: "User Logout" });
});

export {
  authUser,
  registerUser,
  // userProfile,
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
