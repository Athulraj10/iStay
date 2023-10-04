import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


//here time stamp was added with the mongoose inbuild function
const hostelModel = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
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