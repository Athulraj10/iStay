import mongoose from "mongoose";

const enquirySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isVerified:{
    type:Boolean,
    default:'false'
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  userMessage:{
    type:String,
    default:'User Message'
  },
  sellerReply:{
    type:String,
    default:'Seller Reply'
  },
  status:{
    type:String,
    default:'pending'
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
