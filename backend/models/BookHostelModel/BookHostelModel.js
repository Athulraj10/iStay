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
  status: {
    type: String,
    required: false
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
  cancelled: {
    type: Boolean,
    required: false,
    default:false
  },
  expirationDate: {
    type: Date, // Field to track the expiration date
    required: false // You can make this field required or adjust validation as needed
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingModel);
export default Booking;
