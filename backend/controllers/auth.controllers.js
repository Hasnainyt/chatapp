import gentoken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
//signup 
export const signUp=async(req,res)=>{
    try {
        const {userName,email,password}=req.body
        const checkUserByUserName=await User.findOne({userName})

        if(checkUserByUserName){
            return res.status(400).json({
                message:"username already exist"
            })
        }
        const checkUserByEmail=await User.findOne({email})
         if(checkUserByEmail){
            return res.status(400).json({
                message:"email already exist"
            })
        }
        if(password.length<6){
             return res.status(400).json({
                message:"password must be of atleast 6 characters"
            })
        }

        const hashedpassword=await bcrypt.hash(password,10)

        const user=await User.create({
            userName,email,password:hashedpassword
        })

        const token=await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:false //false for localhost during deplymnt make it true

        })

       return res.status(201).json(user)
    } catch (error) {
         return res.status(500).json({
                message:`signup error ${error}`
            })
    }
}



//login
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})

       if(!user){
          return res.status(400).json({
                message:"user doesnt exist"
            })
       }
       
     const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(400).json({
                message:"incorrect password"
            })
      }

        const token=await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:false //false for localhost during deplymnt make it true

        })

       return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({
                message:`login error ${error}`
            })
    }
}

//logout
export const logout=async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message:"logout succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:`logout error ${error}`
        })
    }
}