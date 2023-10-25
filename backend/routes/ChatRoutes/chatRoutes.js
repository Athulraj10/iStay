import express from "express"
const router = express.Router();
import chatController from "../../controllers/ChatController/chatController.js";
// import  {protect}  from "../../middleware/ChatMiddleware/authMiddleware.js";
import  {protect}  from "../../middleware/UserMiddleware/authMiddleware.js";


// router.get('/', AllUsers)
// router.post('/login',authUser)

// router.route('/').post(protect,accessChat);
// router.route('/').get(protect,fetchChats);
// router.route('/group').post(protect,createGroupChat);
// router.route('/rename').put(protect,renameGroup);
// router.route('/groupadd').put(protect,addToGroup);
// router.route('/groupremove').put(protect,removeFromGroup);

router.get('/get-or-createroom',chatController.createRoom)
router.post('/sendchat/:chatid/:sender/:type',chatController.chatSend)
router.get('/get-room-messages/:roomid',chatController.getMessages)
// router.get('/getrooms/:user',chatController.getRooms)


// router.get('/get-doctor-rooms/:seller',chatController.getDoctorsRooms)
// router.post('/sendchat/:chatid/:sender/:type',chatController.chatSend)
// router.get('/get-room-messages/:roomid',chatController.getMessages)

export default router

