import express from "express";
import {
  adminAuthentication,
  adminForget,
  adminVerifyOTP,
  adminResetPassword,
  listUser,
  listSellers,
  blockUser,
  editUser,
  editUserDetails,
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
AdminRoute.post("/listSellers", listSellers);

AdminRoute.post("/listUser/block", blockUser);
AdminRoute.post("/listUsers/edit", editUser);
AdminRoute.post("/listUsers/editUserDetails",editUserDetails);
// // AdminRoute.post('/',)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
AdminRoute.post('/logout',logoutUser)

export default AdminRoute;
