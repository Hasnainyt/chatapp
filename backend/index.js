import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"

const port=process.env.PORT || 8000

const app=express()
app.use(cors({
    origin: "http://localhost:5173", // only allow requests from React
    credentials: true                // allow cookies to be sent
}))
app.use(express.json())  //body se data k liye
app.use(cookieParser()) //Reads cookies from the request and puts them in req.cookies.

app.use("/api/auth",authRouter)
//index.js (postoffice) only looks at the first part of the URL (/api/auth or /api/user) and hands the rest to the correct router to handle!

app.use("/api/user",userRouter)
 app.use("/api/message",messageRouter)
/*app.get('/',(req,res)=>{
    res.send("hello")
})*/


app.listen(port,()=>{
    connectdb()
    console.log("server running at",port)
})





/*POST /api/auth/login
        ↓
app.use("/api/auth") matches ✅
        ↓
Hands over to authRouter
        ↓
authRouter sees "/login"
        ↓
Calls login controller*/