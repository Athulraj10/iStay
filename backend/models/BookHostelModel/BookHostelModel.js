import mongoose from "mongoose";

const bookingModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notified: {
    type: Boolean,
    required: false,
    default:false
  },
  userEmail: {
    type: String,
    required: false,
    default:""
  },
  userName: {
    type: String,
    required: false,
    default:""
  },
  status: {
    type: String,
    required: false,
    default: 'active'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentVia: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    default:0,
    required: true
  },
  rating: {
    type: Number,
    default:0,
    required: false
  },
  cancelled: {
    type: Boolean,
    required: false,
    default:false
  },
  expirationDate: {
    type: Date,
    required: false 
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingModel);
export default Booking;
