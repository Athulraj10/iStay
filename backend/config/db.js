import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connnected ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
        //process exit is a keyword that used to product in node.js to sent
        //an instruction to not terminate 
    }
}


export default connectDB