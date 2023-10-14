import express from "express";
import multer from "multer";
import path from "path";
import {
  // -------admin verification
  adminAuthentication,
  adminForget,
  adminVerifyOTP,
  adminResetPassword,
  logoutAdmin,


  // --------User Management
  listUser,
  blockUser,


  // ----------dashboard values
  dashboardValuesCount,


  // -------------Hostel Management
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

// -----------------Admin ManageMent
AdminRoute.post("/login", adminAuthentication);
AdminRoute.post("/forget", adminForget);
AdminRoute.post("/verifyOTP", adminVerifyOTP);
AdminRoute.post("/resetPassword", adminResetPassword);

// -------------User Management
AdminRoute.post("/listUser", listUser);
AdminRoute.patch("/listUser/block/:id", blockUser);

// ----------------Seller Management
AdminRoute.post("/listSellers", listSellers);
AdminRoute.patch("/listSeller/block/:id",blockSeller);

// --------------HostelManagement
AdminRoute.post('/listHostels',listHostelsAdmin);
AdminRoute.patch('/listHostel/block',BlockHostelsAdmin);


//-------------------- Dashboard Values
AdminRoute.post("/usersCount",dashboardValuesCount);

// // AdminRoute.post('/',)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
AdminRoute.post('/logout',logoutAdmin)

export default AdminRoute;
