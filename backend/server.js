import userRoutes from "./routes/UserRoutes/userRoutes.js"
import sellerRoutes from "./routes/SellerRoutes/SellerRoutes.js"
import adminRoutes from "./routes/AdminRoutes/AdminRoutes.js"
import chatRoutes from "./routes/ChatRoutes/chatRoutes.js"
import { errorHandler, notFound } from "./middleware/UserMiddleware/errorMiddleware.js";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from 'path';
import colors from 'colors'
import cors from 'cors'
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();
connectDB();
const port = process.env.PORT || 5000
const app =express();


app.use(express.static('backend/public'));
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: ["https://istay.site","https://www.istay.site"],
    credentials: true
  }));
app.use('/api/users',userRoutes)
app.use('/api/seller',sellerRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/chats',chatRoutes)
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
  

app.get('/',(req,res)=>res.send("server is ready"))

app.use(notFound)
app.use(errorHandler)
const server = app.listen(port,()=>console.log(`server start port ${port}`.yellow.bold))
import { Server } from 'socket.io'

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://istay.site","https://www.istay.site"],
  },
  
}); 

io.on("connection",(socket)=>{
  console.log("connected with socket io");

  socket.on("setup",(userData)=>{
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log("User Joined room:");
  })
  socket.on('new message',(newMessageReceived)=>{
    var chat = newMessageReceived.room;
    if(!chat.user || !chat.seller){
      return console.log('chat.userrrr not defined')
    }
    if(chat.user._id === newMessageReceived.sender._id){
      socket.to(chat.seller._id).emit("message received",newMessageReceived)
    }

    if(chat.seller._id === newMessageReceived.sender._id){
      socket.to(chat.user._id).emit("message received",newMessageReceived)
    }
  })    

})