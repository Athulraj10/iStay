import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


//here time stamp was added with the mongoose inbuild function
const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{ 
    timestamps:true
});

//pre means before saving to database hashing the password
adminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
//salt means hashing Number of times its inbuild in bcrypt module
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});

//password comparing userentered
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const Admin = mongoose.model('Admin',adminSchema);
export default Admin;