import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


//here time stamp was added with the mongoose inbuild function
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isBlock:{
        type:Boolean,
        default:false,
    },
    email:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        required:false,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    // location:{
    //     type:String,
    //     required:false,
    // },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    wallet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: false,
      },
},{ 
    timestamps:true
});

//pre means before saving to database hashing the password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
//salt means hashing Number of times its inbuild in bcrypt module
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});

//password comparing userentered
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema);
export default User;