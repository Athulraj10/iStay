import userRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();
app.use(cookieParser())
const port = process.env.PORT || 5000

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send("server is ready"))

app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`server start port ${port}`))