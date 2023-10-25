import mongoose from "mongoose";
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
// const AllUsers = asyncHandler(async (req, res) => {
//   console.log("/ called");
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};
//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
//   res.send(users);
// });

// // const accessChat = asyncHandler(async (req, res) => {
// //   const { userId } = req.body;
// //   if (!userId) {
// //     console.log("userid params not sent with request");
// //     return res.sendStatus(400);
// //   }
// //   var isChat = await Chat.find({
// //     isGroupChat: false,
// //     $and: [
// //       {
// //         users: { $elemMatch: { $eq: req.user._id } },
// //         users: { $elemMatch: { $eq: userId } },
// //       },
// //     ],
// //   })
// //     .populate("users", "-password")
// //     .populate("latestMessage");
// //   isChat = await User.populate(isChat, {
// //     path: "latestMessage.sender",
// //     select: "name pic email",
// //   });
// //   if (isChat.length > 0) {
// //     res.send(isChat[0]);
// //   } else {
// //     var chatData = {
// //       chatName: "sender",
// //       isGroupChat: false,
// //       users: [req.user._id, userId],
// //     };
// //     try {
// //         const createdChat = await Chat.create(chatData);
// //         const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users", "-password")
// //         res.status(200).send(FullChat)
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }
// // });

// // ---------------creating model or finding model both are working
// const accessChat = asyncHandler(async (req, res) => {
//   const { userId } = req.body;
//   if (!userId) {
//     console.log("UserId param not sent with request");
//     return res.sendStatus(400);
//   }

//   var isChat = await Chat.find({
//     isGroupChat: false,
//     $and: [
//       { users: { $elemMatch: { $eq: req.user._id } } },
//       { users: { $elemMatch: { $eq: userId } } },
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
//       const createdChat = await Chat.create(chatData);
//       const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//         "users",
//         "-password"
//       );
//       res.status(200).send(FullChat);
//     } catch (error) {
//       res.status(400);
//       throw new Error(error.message);
//     }
//   }
// });

// const fetchChats = asyncHandler(async (req, res) => {
//   try {
//     Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
//       .populate("users", "-password")
//       .populate("latestMessage")
//       .sort({ updatedAt: -1 })
//       .then(async (results) => {
//         results = await User.populate(results, {
//           path: "latestMessage.sender",
//           select: "name pic email",
//         });
//         res.status(200).send(results);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // const createGroupChat = asyncHandler(async (req, res) => {
// //   if (!req.body.users || !req.body.name) {
// //     return res.status(400).send({ message: "please fill all the fields" });
// //   }
// //   var users = JSON.parse(req.body.users);
// //   if (users.length < 2) {
// //     return res.status(400).send("Morethen 2 person needed for a group chat");
// //   }
// //   users.push(req.user);
// //   try {
// //     const groupChat = await Chat.create({
// //       chatName: req.body.name,
// //       users: users,
// //       isGroupChat: true,
// //       groupAdmin: req.user,
// //     });
// //     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
// //       .populate("users", "-password")
// //       .populate("groupAdmin", "-password");
// //     res.status(200).json(fullGroupChat)
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });

// //@description     Create New Group Chat
// //@route           POST /api/chat/group
// //@access          Protected
// const createGroupChat = asyncHandler(async (req, res) => {
//   console.log("group");
//   if (!req.body.users || !req.body.name) {
//     return res.status(400).send({ message: "Please Fill all the feilds" });
//   }

//   var users = JSON.parse(req.body.users);

//   if (users.length < 2) {
//     return res
//       .status(400)
//       .send("More than 2 users are required to form a group chat");
//   }

//   users.push(req.user);

//   try {
//     const groupChat = await Chat.create({
//       chatName: req.body.name,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: req.user,
//     });

//     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password");

//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

// const renameGroup = asyncHandler(async (req, res) => {
//   const { chatId, chatName } = req.body;
//   console.log(chatId + "\\" + chatName);
//   const updatedChat = await Chat.findByIdAndUpdate(
//     chatId,
//     { chatName },
//     { new: true }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");
// });

// const addToGroup = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;
//   const added = Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $push: { users: userId },
//     },
//     { new: true }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");
//   if (!added) {
//     res.status(404);
//     throw new Error("Chat not found");
//   } else {
//     res.json(added);
//   }
// });

// const removeFromGroup = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;
//   const removed = Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $pull: { users: userId },
//     },
//     { new: true }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");
//   if (!removed) {
//     res.status(404);
//     throw new Error("Chat not found");
//   } else {
//     res.json(removed);
//   }
// });

import asyncHandler from "express-async-handler";
import ChatRoom from "../../models/chatRoom.js";
import ChatMessage from "../../models/chatMessage.js";

const chatController = {
    createRoom : asyncHandler(async(req,res)=>{
        try {
            const { user, seller } = req.query
            let chatRoom = await ChatRoom.findOne({
                user:user,
                seller:seller
            })

    
            if(!chatRoom){
                chatRoom = new ChatRoom({
                    user:user,
                    seller:seller,
                    messages:[]
                })
                await chatRoom.save();
            }

            const roomDetails = await ChatRoom.find({ _id: chatRoom._id })
            .populate({
              path: 'seller',
              select: 'name _id mobile' 
            })
            .exec();
            console.log(roomDetails)
            res.status(200).json({roomDetails:roomDetails});
        } catch (error) {
           console.log(error)
        }
    }),

    chatSend: asyncHandler(async (req, res) => {
        try {
          const { content } = req.body;
        const { chatid, sender, type } = req.params;
      console.log(req.body)
      console.log(req.params)
        // Create a new chat message
        const newMessage = new ChatMessage({
          room: chatid,
          sender: sender,
          senderType: type,
          content: content,
        });
      
        // Save the chat message
        const newMessageSaved = await newMessage.save();
        console.log(newMessageSaved)
        let chatRoom = await ChatRoom.findOne({_id:chatid})
        if(chatRoom){
            chatRoom.messages.push(newMessage._id)
        }
        let message = await chatRoom.save()
        console.log(message)
        
        // Populate the sender field with specific fields (_id, name, email)
        // and also populate the nested fields room.user and room.seller
        await newMessage.populate([
          { path: 'sender', select: '_id name email' },
          { path: 'room', populate: [{ path: 'user', select: '_id name email' }, { path: 'seller', select: '_id name email' }] },
        ]);
      
        // Return the chat message with all populated fields
        res.json(newMessage);
        } catch (error) {
          console.log(error)
        }
    }),

    //User side
    getRooms : asyncHandler(async(req,res)=>{
        const { user } = req.params
        const rooms = await ChatRoom.find({user:user}).populate({path:'seller',select:'_id name email'})
        console.log(rooms)
        if(rooms){
            res.status(200).json(rooms)
        }else{
            res.status(400).json({message:"Failed to fetch rooms"})
        }
    }),

    //Doctors side
    getDoctorsRooms : asyncHandler(async(req,res)=>{
        const { seller } = req.params
        const rooms = await ChatRoom.find({seller:seller}).populate({path:'user',select:'_id name email'})
        if(rooms){
            res.status(200).json(rooms)
        }else{
            res.status(400).json({message:"Failed to fetch rooms"})
        }
    }),

    getMessages: asyncHandler(async (req, res) => {
        const { roomid } = req.params;
        console.log(roomid)
        console.log("getMessage")
      
        try {
          // Sort messages in ascending order of createdAt
          const messages = await ChatMessage.find({ room: roomid }).sort({ createdAt: 1 });
      
          if (messages) {
            res.status(200).json(messages);
          } else {
            res.status(404).json({ message: 'No messages found for the given room.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
    })
      
}

export default chatController;


  // // -----------fetch All users
  // AllUsers,

  // //   -----------------Start chat creation
  // accessChat,
  // // ---------------------excluding Self Chat
  // fetchChats,
  // // -------------------------group chat
  // createGroupChat,
  // // ------------------------rename group
  // renameGroup,
  // // ----------------add to group
  // addToGroup,
  // // -------------remove from group
  // removeFromGroup
