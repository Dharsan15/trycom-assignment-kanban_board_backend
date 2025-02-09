import express from "express";

import cors from 'cors';
import  mongoose from "mongoose";

import tasksrouter from "./routes/tasks.js"

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://trycom-assignment-kanban-board-kvca-pi.vercel.app", 
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type"],
    credentials: true
}));


  app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "https://trycom-assignment-kanban-board-kvca-pi.vercel.app/");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  

    next();
  });

  app.use(express.json());

mongoose.connect(process.env.MONGODB_URL as string)

mongoose.connection.on("open" , () => {
    console.log("connected to database");
})

app.use( "/api/tasks" , tasksrouter)

app.listen(8000 , () => {
    console.log("Server Listening to the port 8000");
    
})