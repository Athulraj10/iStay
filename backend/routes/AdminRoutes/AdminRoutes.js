import express from "express"
import { 
    adminAuthentication,
    // logoutUser,
    // getUserProfile,
    // updateUserProfile,
    // forget,verifyOTP,resetPassword
}
    from "../../controllers/AdminController/adminController.js"
// import { protect } from "../middleware/authMiddleware.js";

const AdminRoute = express.Router()

AdminRoute.post('/login',adminAuthentication)
// AdminRoute.post('/forget',forget)
// AdminRoute.post('/verifyOTP',verifyOTP)
// AdminRoute.post('/resetPassword',resetPassword)
// // AdminRoute.post('/',)
// AdminRoute.post('/logout',logoutUser)
// AdminRoute.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default AdminRoute

