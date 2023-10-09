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

  listHostelsAdmin,
  addHostelDetails,
  BlockHostelsAdmin,
  

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



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'backend/public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed!'), false);
//     }
//   },
// });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'backend/public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


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
  '/listHostels/addhostelDetails',
  upload.array('files', 10), 
    addHostelDetails
);
AdminRoute.post('/listHostels',listHostelsAdmin);
AdminRoute.patch('/listHostel/block',BlockHostelsAdmin);


//-------------------- Dashboard Values
AdminRoute.post("/usersCount",dashboardValuesCount);

// // AdminRoute.post('/',)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
AdminRoute.post('/logout',logoutUser)

export default AdminRoute;
