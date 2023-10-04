import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


//here time stamp was added with the mongoose inbuild function
const sellerSchema = mongoose.Schema({
    name:{
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

//pre means before saving to database hashing the password
sellerSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
//salt means hashing Number of times its inbuild in bcrypt module
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});

//password comparing userentered
sellerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const Seller = mongoose.model('Seller',sellerSchema);
export default Seller;