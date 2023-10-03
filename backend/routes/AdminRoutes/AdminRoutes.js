import express from "express"
import { 
    adminAuthentication,
    adminForget,adminVerifyOTP,adminResetPassword,listUser
    // logoutUser,
    // getUserProfile,
    // updateUserProfile,
    // forget,verifyOTP,resetPassword
}
    from "../../controllers/AdminController/adminController.js"
// import { protect } from "../middleware/authMiddleware.js";

const AdminRoute = express.Router()

AdminRoute.post('/login',adminAuthentication)
AdminRoute.post('/forget',adminForget)
AdminRoute.post('/verifyOTP',adminVerifyOTP)
AdminRoute.post('/resetPassword',adminResetPassword)
AdminRoute.post('/listUser',listUser)
// // AdminRoute.post('/',)
// AdminRoute.post('/logout',logoutUser)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default AdminRoute

