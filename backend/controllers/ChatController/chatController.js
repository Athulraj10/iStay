
import asyncHandler from "express-async-handler";
import ChatRoom from "../../models/chatRoom.js";
import ChatMessage from "../../models/chatMessage.js";
import {aggregateBookingWithHostel} from "../UserControllers/aggregateBookingWithHostel.js";

const chatController = {
  createRoom: asyncHandler(async (req, res) => {
    try {
      const { user, seller, bookingId } = req.query;
      const aggregateBookingDetails = await aggregateBookingWithHostel(
        bookingId
      );
      let chatRoom = await ChatRoom.findOne({
        user: user,
        seller: seller,
      });

      if (!chatRoom) {
        chatRoom = new ChatRoom({
          user: user,
          seller: seller,
          messages: [],
        });
        await chatRoom.save();
      }
      const roomDetails = await ChatRoom.find({ _id: chatRoom._id })
        .populate({
          path: "seller",
          select: "name _id mobile",
        })
        .exec();
      let messageFiler = chatRoom.messages[chatRoom.messages.length - 1];
      const firstMessage = await ChatMessage.findOne(messageFiler);
      res
        .status(200)
        .json({
          roomDetails: roomDetails,
          aggregateBookingDetails: aggregateBookingDetails,
          firstMessage: firstMessage,
        });
    } catch (error) {
      console.log(error);
    }
  }),

  chatSend: asyncHandler(async (req, res) => {
    try {
      const { content } = req.body;
      const { chatid, sender, type } = req.params;
      // Create a new chat message
      const newMessage = new ChatMessage({
        room: chatid,
        sender: sender,
        senderType: type,
        content: content,
      });

      // Save the chat message
      const newMessageSaved = await newMessage.save();
      let chatRoom = await ChatRoom.findOne({ _id: chatid });
      if (chatRoom) {
        chatRoom.messages.push(newMessage._id);
      }
      let message = await chatRoom.save();

      // Populate the sender field with specific fields (_id, name, email)
      // and also populate the nested fields room.user and room.seller
      await newMessage.populate([
        { path: "sender", select: "_id name email" },
        {
          path: "room",
          populate: [
            { path: "user", select: "_id name email" },
            { path: "seller", select: "_id name email" },
          ],
        },
      ]);
      // Return the chat message with all populated fields
      res.json(newMessage);
    } catch (error) {
      console.log(error);
    }
  }),

  //User side
  getRooms: asyncHandler(async (req, res) => {
    const { user } = req.params;
    const rooms = await ChatRoom.find({ user: user }).populate({
      path: "seller",
      select: "_id name email mobile location ",
    });
    if (rooms) {
      res.status(200).json(rooms);
    } else {
      res.status(400).json({ message: "Failed to fetch rooms" });
    }
  }),

  //Doctors side
  getDoctorsRooms: asyncHandler(async (req, res) => {
    const { seller } = req.params;
    const rooms = await ChatRoom.find({ seller: seller }).populate({
      path: "user",
      select: "_id name email",
    });
    if (rooms) {
      res.status(200).json(rooms);
    } else {
      res.status(400).json({ message: "Failed to fetch rooms" });
    }
  }),

  getMessages: asyncHandler(async (req, res) => {
    const { roomid } = req.params;

    try {
      // Sort messages in ascending order of createdAt
      const messages = await ChatMessage.find({ room: roomid }).sort({
        createdAt: 1,
      });
      if (messages) {
        res.status(200).json(messages);
      } else {
        res
          .status(404)
          .json({ message: "No messages found for the given room." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }),
};

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
