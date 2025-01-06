process.on("uncaughtException",(err,req,res,next)=>{
    console.log(err);
})
import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import connectionToDB from './models/connection.js'
import authRoutes from './routes/auth.routes.js'
import HandleGlobalErrors from './middleware/error/globalErrorHandler.js'
const port = process.env.PORT || 8000

//Invoke
const app = express()
app.use(express.json())

//Fire Connection
await connectionToDB()

//Routing
app.use("/api/auth", authRoutes);

//Handle Error
process.on("unhandledRejection",(err,req,res,next)=>{
    next(new AppError(`Error Connecting to Database`,404))
})
app.use('*',(req,res,next)=>{
    next(new AppError(`Invalid Url ${req.originalUrl}`,404))
})
app.use(HandleGlobalErrors)

//Listening
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})