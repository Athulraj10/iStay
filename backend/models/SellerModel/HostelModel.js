import mongoose from "mongoose";

//here time stamp was added with the mongoose inbuild function
const hostelModel = mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', 
        required:true
        // 'Seller' should match the name of your seller model
      },
      
    images:{
        type:[String],
        // type:[],
        required:true
    },
    isBlock:{
        type:Boolean,
        default:false,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    hostelName:{
        type:String,
        required:true
    },
    mainLocation:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    fullDetails:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    mapLink:{
        type:String,
        required:true
    },
    additionalAboutHostel:{
        type:String,
        required:true
    },
    nearByLocation:{
        type:String,
        required:true
    },
    restrictions:{
        type:String,
        required:true
    },
    descriptionAboutHostel:{
        type:String,
        required:true
    },
    guestProfile:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    extraPrice:{
        type:Number,
        required:true
    },
    totalBedInRoom:{
        type:String,
        required:true
    },
    bedAvailableNow:{
        type:Number,
        required:true
    },
    Wifi:{
        type:String,
        required:true
    },
    food:{
        type:String,
        required:true
    },
    parking:{
        type:String,
        required:true
    },
    drinkingWater:{
        type:String,
        required:true
    },
},{ 
    timestamps:true
});


const Hostel = mongoose.model('Hostel',hostelModel);
export default Hostel;