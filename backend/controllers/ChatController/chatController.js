import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../../models/UserModels/userModel.js";
import Chat from "../../models/chatModel.js";
// import nodemailer from "nodemailer";
// import {
//   sessionSecret,
//   emailUser,
//   NewAppPassword,
// } from "../../config/config.js";
// import Admin from "../../models/AdminModel/adminModel.js";
// import OTP from "../../models/OTPModel.js";
// import generateTokenAdmin from "../../utils/generateTokenAdmin.js";
// import Seller from "../../models/SellerModel/SellerModel.js";
// import Hostel from "../../models/SellerModel/HostelModel.js";

// // -------------------All Users---------------------------
const AllUsers = asyncHandler(async (req, res) => {
  console.log("/ called");
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

// const accessChat = asyncHandler(async (req, res) => {
//   const { userId } = req.body;
//   if (!userId) {
//     console.log("userid params not sent with request");
//     return res.sendStatus(400);
//   }
//   var isChat = await Chat.find({
//     isGroupChat: false,
//     $and: [
//       {
//         users: { $elemMatch: { $eq: req.user._id } },
//         users: { $elemMatch: { $eq: userId } },
//       },
//     ],
//   })
//     .populate("users", "-password")
//     .populate("latestMessage");
//   isChat = await User.populate(isChat, {
//     path: "latestMessage.sender",
//     select: "name pic email",
//   });
//   if (isChat.length > 0) {
//     res.send(isChat[0]);
//   } else {
//     var chatData = {
//       chatName: "sender",
//       isGroupChat: false,
//       users: [req.user._id, userId],
//     };
//     try {
//         const createdChat = await Chat.create(chatData);
//         const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users", "-password")
//         res.status(200).send(FullChat)
//     } catch (error) {
//       console.error(error);
//     }
//   }
// });

// ---------------creating model or finding model both are working
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please fill all the fields" });
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send("Morethen 2 person needed for a group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat)
  } catch (error) {
    console.log(error);
  }
});

export {
  // -----------fetch All users
  AllUsers,

  //   -----------------Start chat creation
  accessChat,
  // ---------------------excluding Self Chat
  fetchChats,
  // -------------------------group chat
  createGroupChat
};
