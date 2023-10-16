import mongoose from "mongoose";

//here time stamp was added with the mongoose inbuild function
const bookingModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required:true
        // 'Seller' should match the name of your seller model
      },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel', 
        required:true
        // 'Seller' should match the name of your seller model
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