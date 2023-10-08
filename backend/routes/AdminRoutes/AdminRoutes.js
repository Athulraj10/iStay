import express from "express";

import multer from "multer";
import path from "path";



import {
  adminAuthentication,
  adminForget,
  adminVerifyOTP,
  adminResetPassword,

  listUser,
  blockUser,
  editUser,
  editUserDetails,

  
  dashboardValuesCount,

  addHostelDetails,
  

  listSellers,
  editSeller,
  editSellerDetails,
  
  logoutUser,
  // logoutUser,
  // getUserProfile,
  // updateUserProfile,
  // forget,verifyOTP,resetPassword
} from "../../controllers/AdminController/adminController.js";
// import { protect } from "../middleware/authMiddleware.js";

const AdminRoute = express.Router();



AdminRoute.post("/login", adminAuthentication);
AdminRoute.post("/forget", adminForget);
AdminRoute.post("/verifyOTP", adminVerifyOTP);
AdminRoute.post("/resetPassword", adminResetPassword);

AdminRoute.post("/listUser", listUser);
AdminRoute.post("/listUsers/edit", editUser);
AdminRoute.post("/listUsers/editUserDetails",editUserDetails);
AdminRoute.post("/listUser/block", blockUser);


AdminRoute.post("/listSellers", listSellers);
AdminRoute.post("/listSeller/edit", editSeller);
AdminRoute.post("/listSeller/editSellerDetails",editSellerDetails);

AdminRoute.post(
  '/listHostels/addhostelDetails',addHostelDetails
);


//-------------------- Dashboard Values
AdminRoute.post("/usersCount",dashboardValuesCount);

// // AdminRoute.post('/',)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
AdminRoute.post('/logout',logoutUser)

export default AdminRoute;
