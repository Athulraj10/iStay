import express from "express"
import { 
    registerSeller,authSeller
}
    from "../../controllers/sellerController/SellerControllers.js";
import { protect } from "../../middleware/authMiddleware.js";

const sellerRoute = express.Router()

sellerRoute.post('/register',registerSeller)
sellerRoute.post('/login',authSeller)
// sellerRoute.post('/seller/forget',sellerForget)
// sellerRoute.post('/seller/verifyOTP',sellerVerifyOTP)
// sellerRoute.post('/seller/resetPassword',sellersResetPassword)
// // sellerRoute.post('/',)
// sellerRoute.post('/seller/logout',logoutSeller)
// sellerRoute.route('/seller/profile').get(protect,getSellerProfile).put(protect,updateSellerProfile)


export default sellerRoute

