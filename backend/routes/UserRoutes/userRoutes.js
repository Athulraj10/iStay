import express from "express"
import multer from "multer";    
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forget,verifyOTP,resetPassword,
    
    singlePageView,
    findAccommodation,
    bookHostel,bookingConfirmation,myBookings,addReview
}
    from "../../controllers/UserControllers/userControllers.js";
// import { protect } from "../../middleware/authMiddleware.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/public/image');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

const router = express.Router()



router.post('/register',registerUser)
router.post('/login',authUser)
router.post('/forget',forget)
router.post('/verifyOTP',verifyOTP)
router.post('/resetPassword',resetPassword)


router.post('/findAccommodation',findAccommodation)
router.post('/findAccommodation/singlePageView',singlePageView)
router.post('/bookingHostel',bookHostel)
router.get('/bookingConfirmation/',bookingConfirmation)
router.post('/addReview',upload.array('files',5),addReview)

router.get('/myBookings',myBookings)

// router.post('/',)
router.post('/logout',logoutUser)
// router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default router

