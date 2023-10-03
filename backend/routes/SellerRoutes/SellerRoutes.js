import express from "express"
import { 
    registerSeller,authSeller,sellerForget,sellerVerifyOTP
}
    from "../../controllers/sellerController/SellerControllers.js";
import { protect } from "../../middleware/authMiddleware.js";

const sellerRoute = express.Router()

sellerRoute.post('/register',registerSeller)
sellerRoute.post('/login',authSeller)
sellerRoute.post('/forget',sellerForget)
sellerRoute.post('/verifyOTP',sellerVerifyOTP)
// sellerRoute.post('/seller/resetPassword',sellersResetPassword)
// // sellerRoute.post('/',)
// sellerRoute.post('/seller/logout',logoutSeller)
// sellerRoute.route('/seller/profile').get(protect,getSellerProfile).put(protect,updateSellerProfile)


export default sellerRoute

