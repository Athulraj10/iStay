import express from "express";
import {
  registerSeller,
  authSeller,
  sellerForget,
  sellerVerifyOTP,
  sellersResetPassword,
  
  // ----------hostel management---------
  listHostels,
  editHostel,
  editHostelDetails,
  addHostelDetails,
  // ----------dashboard management---------
  dashboardValues,
  sellerNotification,
  sellerNotificationDetails,
  listEnquery,
  listEnqueryReply,

  logoutSeller,
} from "../../controllers/sellerController/SellerControllers.js";
import { sellerMiddleware } from "../../middleware/SellerMiddleware/SellerMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'backend/public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


const sellerRoute = express.Router();

sellerRoute.post("/register", registerSeller);
sellerRoute.post("/login", authSeller);
sellerRoute.post("/forget", sellerForget);
sellerRoute.post("/verifyOTP", sellerVerifyOTP);
sellerRoute.post("/resetPassword",sellersResetPassword);


// -----------Dashboard Manageing-----------
sellerRoute.get("/dashboard",sellerMiddleware,dashboardValues)
sellerRoute.get("/notification",sellerMiddleware,sellerNotification)
sellerRoute.get("/notificationDetails",sellerMiddleware,sellerNotificationDetails)
sellerRoute.get("/listenquery",sellerMiddleware,listEnquery)
sellerRoute.get("/listenqueryreply/:id",listEnqueryReply)


// -----------hostel Manageing-----------
sellerRoute.post("/listHostels",sellerMiddleware,listHostels);
sellerRoute.post("/listHostels/editHostel",editHostel);
sellerRoute.post("/listHostels/edithostelDetails",
upload.array('files',10),editHostelDetails);
sellerRoute.post(
  '/listHostels/addhostelDetails',
  upload.array('files', 10), 
    addHostelDetails
);

// sellerRoute.post("/dashboard", sellersResetPassword);
// // sellerRoute.post('/',)
// sellerRoute.route('/seller/profile').get(protect,getSellerProfile).put(protect,updateSellerProfile)
sellerRoute.post('/logout',logoutSeller)

export default sellerRoute;
