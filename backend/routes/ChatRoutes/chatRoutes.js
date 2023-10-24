import express from "express"
const router = express.Router();
import multer from "multer";    
import { 
    AllUsers,

    
    accessChat
   }
    from "../../controllers/ChatController/chatController.js";
// import  {protect}  from "../../middleware/ChatMiddleware/authMiddleware.js";
import  {protect}  from "../../middleware/UserMiddleware/authMiddleware.js";


router.get('/', AllUsers)
// router.post('/login',authUser)

router.route('/').post(
    protect,
    accessChat);
// router.route('/').get(protect,fetchChat);

// router.route('/group').post(protect,createGroupChat);
// router.route('/rename').put(protect,renameGroup);

// router.route('/groupremove').put(protect,removeFromGroup);
// router.route('/groupadd').put(protect,addToGroup);


export default router

