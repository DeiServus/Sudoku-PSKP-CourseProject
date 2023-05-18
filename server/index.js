const express = require("express");
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require("./router/auth");
const errorMiddleware = require('./middlewares/error-middleware.js')
const http = require('http');
const https = require('https');
const { Server } = require('socket.io');
const app = express();
const wss = http.createServer(app);

const options = { 
  key: fs.readFileSync('C:/Users/Ильюха/Desktop/sudoku/https/LAB.key'), 
  cert: fs.readFileSync('C:/Users/Ильюха/Desktop/sudoku/https/LAB.crt'), 
}; 

const server = https.createServer(options, app);

const io = new Server(wss, {
  cors:{
    origin:process.env.CLIENT_URL,
    methods:["GET", "POST"],
  },
})
io.on("connection", (socket)=>{
  socket.on("sendmessage", data =>{
    io.emit("sendmessage", {
      message:data.message,
      name:data.name
    })
  })
})


app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const start =async ()=>{
  try{
    server.listen(5000, async() => {
      console.log("Server is running on port 5000");
    });
    wss.listen(5001, ()=>{
      console.log("WSServer is running on port 5001");
    })
  }catch(e){
    console.log(e);
  }
}
start();