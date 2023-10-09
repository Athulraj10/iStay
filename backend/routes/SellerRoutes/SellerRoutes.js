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


  logoutSeller,
} from "../../controllers/sellerController/SellerControllers.js";
import { protect } from "../../middleware/authMiddleware.js";
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


// -----------hostel Manageing-----------
sellerRoute.post("/listHostels",listHostels);
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
