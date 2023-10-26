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
    findAccommodation,high,low,search,
    bookHostel,bookingConfirmation,myBookings,makeEnquery,cancelBooking,addReview
}
    from "../../controllers/UserControllers/userControllers.js";
import { protect } from "../../middleware/UserMiddleware/authMiddleware.js";

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
// router.use(protect);


router.post('/register',registerUser)
router.post('/login',authUser)
router.post('/forget',forget)
router.post('/verifyOTP',verifyOTP)
router.post('/resetPassword',resetPassword)
router.get('/profile',protect,getUserProfile)
router.put('/profile',updateUserProfile)
// router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


router.post('/findAccommodation',findAccommodation)
router.post('/findAccommodation/singlePageView',singlePageView)
router.get('/findAccommodation/high',high)
router.get('/findAccommodation/low',low)
router.get('/findAccommodation/search',search)
router.post('/bookingHostel',protect,bookHostel)
router.get('/bookingConfirmation/',protect,bookingConfirmation)
router.post('/addReview',protect,upload.array('files',3),addReview)

router.get('/enquery',protect,makeEnquery)
router.get('/myBookings',protect,myBookings)
router.patch('/myBookings/cancelBooking/:id',cancelBooking)

// router.post('/',)
router.post('/logout',logoutUser)


export default router

