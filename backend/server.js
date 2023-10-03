import userRoutes from "./routes/UserRoutes/userRoutes.js"
import sellerRoutes from "./routes/SellerRoutes/SellerRoutes.js"
import adminRoutes from "./routes/AdminRoutes/AdminRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();
const port = process.env.PORT || 5000

const app =express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)
app.use('/api/seller',sellerRoutes)
app.use('/api/admin',adminRoutes)


app.get('/',(req,res)=>res.send("server is ready"))

app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`server start port ${port}`))