import mongoose from "mongoose";

//here time stamp was added with the mongoose inbuild function
const hostelModel = mongoose.Schema({
    primaryImage:{
        type:String,
        required:true
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
        type:String,
        required:true
    },
    extraPrice:{
        type:String,
        required:true
    },
    totalBedInRoom:{
        type:String,
        required:true
    },
    bedAvailableNow:{
        type:String,
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