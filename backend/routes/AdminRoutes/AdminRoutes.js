import express from "express";
import multer from "multer";
import path from "path";
import {
  // --------------------Admin verification
  adminAuthentication,
  adminForget,
  adminVerifyOTP,
  adminResetPassword,
  logoutAdmin,


  // -----------------------User Management
  listUser,
  blockUser,


  // -----------------------Dashboard values
  dashboardValuesCount,


  // ------------------------Hostel Management
  listHostelsAdmin,
  BlockHostelsAdmin,
  

  // -----------Seller Management
  listSellers,
  blockSeller,
  
  // logoutAdmin,
  // getUserProfile,
  // updateUserProfile,
  // forget,verifyOTP,resetPassword
} from "../../controllers/AdminController/adminController.js";
import { adminMiddleware } from "../../middleware/AdminMiddleware/authMiddleware.js";
const AdminRoute = express.Router();

export default AdminRoute;
