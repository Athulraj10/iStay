import mongoose from "mongoose";

//here time stamp was added with the mongoose inbuild function
const bookingModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required:true
      },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel', 
        required:true
      },
      date: {
        type: Date,
        required: true
      },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', 
        required:true
      },
      paymentMethod:{
        type:String,
        required:true
    },
      paymentVia:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }
},{ 
    timestamps:true
});


const Booking = mongoose.model('Booking',bookingModel);
export default Booking;