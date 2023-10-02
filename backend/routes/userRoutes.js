import express from "express"
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile}
    from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',authUser)
// router.post('/',)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default router

