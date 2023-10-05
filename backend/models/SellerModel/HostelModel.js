import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


//here time stamp was added with the mongoose inbuild function
const hostelModel = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    houseName:{
        type:String,
        required:true,
        unique:true
    },
    mainLocation:{
        type:String,
    },
    additionalOptions:{
        type:String,
        required:true
    },
    locationWithPincode:{
        type:Number,
        required:true
    },
    Restriction:{
        type:String,
        required:true
    },
    GuestProfile:{
        type:Number,
        required:true
    },
    images:{
        type:Number,
        required:true
    },
    contactDetails:{
        type:Number,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    MapLink:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    extraCharge:{
        type:Number,
        required:true
    },
    totalBed:{
        type:Number,
        required:true
    },
    bedAvailable:{
        type:Number,
        required:true
    },
    is_wifi:{
        type:Number,
        required:true
    },
    is_food:{
        type:Number,
        required:true
    },
    is_parking:{
        type:Number,
        required:true
    },
    drinkingWater:{
        type:Number,
        required:true
    },
    AdcancePayment:{
        type:Number,
        required:true
    },
    cancellationAmount:{
        type:Number,
        required:true
    },
    description:{
        type:Number,
        required:true
    },
    idProof:{
        type:Number,
        required:true
    },
    seller:{
        type:Number,
        required:true
    },
},{ 
    timestamps:true
});

// //pre means before saving to database hashing the password
// hostelModel.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
// //salt means hashing Number of times its inbuild in bcrypt module
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt)
// });

// //password comparing userentered
// hostelModel.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword,this.password)
// }

const Hostel = mongoose.model('Hostel',hostelModel);
export default Hostel;