import express from "express"
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forget,verifyOTP,resetPassword,
    
    singlePageView,
    findAccommodation
}
    from "../../controllers/UserControllers/userControllers.js";
// import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',authUser)
router.post('/forget',forget)
router.post('/verifyOTP',verifyOTP)
router.post('/resetPassword',resetPassword)


router.post('/findAccommodation',findAccommodation)
router.post('/findAccommodation/singlePageView',singlePageView)


// router.post('/',)
router.post('/logout',logoutUser)
// router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default router

