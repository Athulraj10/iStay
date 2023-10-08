import express from "express";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the absolute path to the directory where you want to store the files
    cb(null, path.join(__dirname, "uploads")); // Change "uploads" to your desired directory
  },
  filename: (req, file, cb) => {
    // Keep the original filename
    cb(null, file.originalname);
  },
});
console.log(storage)

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// const storage = multer.diskStorage({
//   destination:(req,file,cb) => {
//     cb(null, 'backend')
//   },
//   filename:(req,file,cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed!"), false); 
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter, 
// });


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
  '/listHostels/addhostelDetails',
  upload.single('additionalImages'),
  // upload.array('additionalImages', 5), // "additionalImages" is the field name, and 5 is the maximum number of files
  addHostelDetails
);


//-------------------- Dashboard Values
AdminRoute.post("/usersCount",dashboardValuesCount);

// // AdminRoute.post('/',)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
AdminRoute.post('/logout',logoutUser)

export default AdminRoute;
