import express from "express"
import { 
    registerSeller
}
    from "../../controllers/sellerController/SellerControllers.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register',registerSeller)
// router.post('/sellers/login',authSeller)
// router.post('/sellers/forget',sellerForget)
// router.post('/sellers/verifyOTP',sellerVerifyOTP)
// router.post('/sellers/resetPassword',sellersResetPassword)
// // router.post('/',)
// router.post('/sellers/logout',logoutSeller)
// router.route('/sellers/profile').get(protect,getSellerProfile).put(protect,updateSellerProfile)


export default router

