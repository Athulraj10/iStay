import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import {
  sessionSecret,
  emailUser,
  NewAppPassword,
} from "../../config/config.js";
import Seller from "../../models/SellerModel/SellerModel.js";
import OTP from "../../models/OTPModel.js";
import generateTokenSeller from "../../utils/generateTokenSeller.js";
import Hostel from "../../models/SellerModel/HostelModel.js";
import Booking from "../../models/BookHostelModel/BookHostelModel.js";
import Enquiry from "../../models/UserModels/enquery.js";
import RoomChat from "../../models/chatRoom.js";

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
        console.log(error);
      } else {
        console.log("email successfully", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

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
    console.log(error.message);
  }
};

// -------------------Aggrigate Booking---------------------------
const aggregateBookingWithHostel = async (sellerId) => {
  try {
    const result = await Booking.aggregate([
      {
        $match: { seller: new mongoose.Types.ObjectId(sellerId) },
      },
      {
        $lookup: {
          from: "hostels", // Name of the Hostel collection
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
          from: "users", // Name of the Sellers collection
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
          // user: { $first: '$user' },
          // hostel: { $first: '$hostel' },
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
// @desc Auth user/set token
// access Public
// route POST// /api/users
const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });
  if (!seller) {
    return res.status(401).json({
      message: "Invalid Email or Password",
    });
  }
  if (seller.isBlock) {
    return res.status(401).json({
      message: "Seller Is blocked",
    });
  }
  if (seller && (await seller.matchPassword(password))) {
    // Assuming generateTokenSeller is a valid function
    const token = generateTokenSeller(res, seller._id); // Pass res as the first argument

    return res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      token, // Send the token back to the client
    });
  }
  // If the password doesn't match
  return res.status(401).json({
    message: "Invalid Email or Password",
  });
});

// Aggregate daily sales for a specific seller
const aggregateDailySales = async (sellerId, startDate, endDate) => {
  // Ensure that sellerId is a valid ObjectId
  const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
  const result = await Booking.aggregate([
    {
      $match: {
        seller: sellerObjectId,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
        },
        totalAmount: { $sum: "$totalAmount" },
      },
    },
  ]);

  return result;
};

// Aggregate monthly sales for a specific seller
const aggregateMonthlySales = async (sellerId, startDate, endDate) => {
  try {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const result = await Booking.aggregate([
      {
        $match: {
          seller: sellerObjectId,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
    return result;
  } catch (error) {
    console.error("Error in aggregateMonthlySales:", error);
    throw error;
  }
};

// -------------------Register New seller---------------------------
//@desc createing new  user
//access Public
//route POST// /api/register
const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const sellerExists = await Seller.findOne({ email });

  if (sellerExists) {
    const error = new Error("Seller Already Exists");
    res.status(400);
    error.status = 400;
    throw error;
  }

  // If seller does not exist, create a new seller
  const sellerRegister = await Seller.create({
    name,
    email,
    password,
    mobile,
  });

  if (sellerRegister) {
    generateTokenSeller(res, sellerRegister._id);
    res.status(201).json({
      _id: sellerRegister._id,
      name: sellerRegister.name,
      email: sellerRegister.email,
    });
  }
});

// -------------------Forget Password Seller Verification---------------------------
//@desc Auth user/set token
//access Public
//route POST// /api/users
const sellerForget = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const seller = await Seller.findOne({ email });
  if (!seller) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }
  if (seller) {
    let OTPgenerated = Math.floor(100000 + Math.random() * 900000);
    // sendForgetPassword(seller.name, seller.email, OTPgenerated);
    console.log(OTPgenerated);
    const saveOrNot = await OTPsaveFunction(seller.email, OTPgenerated);
    return res.json({
      email,
    });
  }
});

// -----------------------------Verify OTP ---------------------------
const sellerVerifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = req.body.enteredOTP;
  try {
    const seller = await OTP.findOne({ email });
    if (!seller) {
      return res.json({ message: "Invalid Expired" });
    }
    if (seller) {
      const enterOTP = parseInt(otp);
      const databaseOTP = parseInt(seller.otp);
      if (enterOTP !== databaseOTP) {
        return res.status(401).json({ message: "Invalid OTP" });
      }
      if (enterOTP === databaseOTP) {
        return res.status(200).json({ seller: seller.email });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

// ----------------------------Reset Password-------------
const sellersResetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  try {
    const seller = await Seller.findOne({ email: userId });
    if (!seller) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
    }
    if (seller) {
      seller.password = password;
      await seller.save();
      res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// -------------------Dashboard Values page---------------------------
const dashboardValues = asyncHandler(async (req, res) => {
  try {
    const sellerId = req.query._id;
    const bookingCount = await Booking.countDocuments({ seller: sellerId });
    console.log(sellerId)
    const enquery = await Enquiry.countDocuments({ seller: sellerId, isVerified: false });
    const totalMessages = await RoomChat.countDocuments({ seller: sellerId });
    const revenue = await Booking.aggregate([
      {
        $match: { seller: new mongoose.Types.ObjectId(sellerId)},
      },
      {
        $group: {
          _id: "$seller",
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
    console.log(revenue)
    const totalSale = await Booking.aggregate([
      {
        $match: { seller: new mongoose.Types.ObjectId(sellerId)},
      },
      {
        $group: {
          _id: "$seller",
          totalAmount: { $sum: "$totalAmount" },
        },
      },{
        $unwind:'$totalAmount'
      }
    ]);
    
    const today = new Date(); // Current date
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 1);
    const startOfDay = new Date(dayBeforeYesterday);

    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 20);
    const last20days = new Date(lastMonth);

    const endOfDay = new Date(today);
    const dailyRevenue = await aggregateDailySales(
      sellerId,
      startOfDay,
      endOfDay
    );
    const monthlyRevenue = await aggregateMonthlySales(
      sellerId,
      last20days,
      endOfDay
    );

    return res.status(200).json({
      bookingCount: bookingCount ? bookingCount : 0,
      revenue: revenue[0]?.totalAmount ? revenue[0].totalAmount : 0,
      dailyRevenue: dailyRevenue ? dailyRevenue : 0,
      monthlyRevenue: monthlyRevenue ? monthlyRevenue : 0,
      totalSale:totalSale[0].totalAmount,
      enquery:enquery,
      messages:totalMessages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// -------------------Seller Notificaition Count Page---------------------------
const sellerNotification = asyncHandler(async (req, res) => {
  try {
    const sellerInfo = req.query.sellerInfo;
    const sellerBookings = await Booking.countDocuments({ seller: sellerInfo });
    if (sellerBookings) {
      return res.json({ sellerBookings });
    }
    if (!sellerBookings) {
      return res.status(502).json(null);
    }
  } catch (error) {
    console.error(error);
  }
});
// -------------------Seller notificaiton detail page---------------------------
const sellerNotificationDetails = asyncHandler(async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    const sellerBookings = await aggregateBookingWithHostel(sellerId);
    if (sellerBookings) {
      return res.json({ sellerBookings });
    }
    if (!sellerBookings) {
      return res.status(502).json(null);
    }
  } catch (error) {
    console.error(error);
  }
});
// ----------------------------List listEnquery-------------
const listEnquery = asyncHandler(async (req, res) => {
  try {
    const sellerId = req.seller._id;
    if (sellerId) {
      const enquery = await Enquiry.find({ seller: sellerId, isVerified: false });
      res.status(200).json({ enqueryData: enquery });
    }
  } catch (error) {
    cosnole.error(error);
  }
});
// ----------------------------List listEnquery-------------
const listEnqueryReply = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.query;

    if (id && message) {
      const enqueryReply = await Enquiry.findOne({ _id: id });

      if (enqueryReply) {
        enqueryReply.isVerified = true;
        enqueryReply.sellerReply = message; 
        enqueryReply.status = 'verified'; 
        await enqueryReply.save();
        return res.status(200).json({updated:true})
      } 
    }
    else{
      res.status(400).json({message:'Please fill the Field'})
    }
    //    const filter = {
    //      id,
    //   };

    //   const update = {
    //     $set: {
    //       isVerified: true,
    //       sellerReply: message,
    //     },
    //   };

    //   const result = await Enquiry.updateMany(filter, update);
    //   console.log(
    //     `${result.n} documents matched and ${result.nModified} documents modified`
    //   );
    // }
  } catch (error) {
    cosnole.error(error);
  }
});
// ----------------------------List seller Hostels-------------
const listHostels = asyncHandler(async (req, res) => {
  try {
    const sellerID = req.body.sellerId;
    if (sellerID) {
      const listHostels = await Hostel.find({ seller: sellerID });
      res.status(200).json({ data: listHostels });
    }
  } catch (error) {
    console.log("listHostelAdmin");
    res.status(500).json({
      message: "Hostel List Error",
    });
  }
});
// ----------------------------Edit Hostels Data senting Part-------------
const editHostel = asyncHandler(async (req, res) => {
  const id = req.body._id;
  try {
    const hostelDetails = await Hostel.findOne({ _id: id });
    res.status(200).json({ data: hostelDetails });
  } catch (error) {
    console.log(error);
  }
});
// ----------------------------editHostel Details Hostel data receiving part-------------
const editHostelDetails = asyncHandler(async (req, res) => {
  const formDataObject = req.body;
  try {
    if (!formDataObject) {
      return res
        .status(400)
        .json({ message: "Bad request. Request body is empty." });
    }

    const hostel = await Hostel.findOne({ _id: formDataObject.id });

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found." });
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

    // Update the hostel document with editedDetails
    const updatedHostel = await Hostel.findOneAndUpdate(
      { _id: formDataObject.id },
      editedDetails,
      { new: true } // Return the updated document
    );

    if (updatedHostel) {
      return res.status(200).json({
        hostelUpdated: true,
        updatedHostel,
      });
    } else {
      return res.status(500).json({ message: "Failed to update hostel." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
// ----------------------------Seller Add Hostel-------------
const addHostelDetails = asyncHandler(async (req, res) => {
  const formDataObject = req.body;
  // ---------save value to database--------
  try {
    if (!formDataObject) {
      return res
        .status(404)
        .json({ message: "Something Wrong Please Try Again" });
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
          .json({ message: "Something Wrong Please Try Again" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Some Field Missing or Server Error" });
  }
});
// --------------------------Logout clearing JWT---------------------------
//@desc logout USer
//access Public
//route POST// /api/logout
const logoutSeller = asyncHandler(async (req, res) => {
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

export {
  // Admin AUthentication and more
  authSeller,
  registerSeller,
  logoutSeller,
  sellerForget,
  sellerVerifyOTP,
  sellersResetPassword,

  //Dashboard Values
  dashboardValues,
  sellerNotification,
  sellerNotificationDetails,
  listEnquery,
  listEnqueryReply,

  // LIST HOSTEL
  listHostels,
  editHostel,
  editHostelDetails,
  addHostelDetails,
};
