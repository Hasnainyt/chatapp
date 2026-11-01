//fetch curr user id details from cookies
// Middleware to check if user is authenticated using JWT from cookies
import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
      let token=req.cookies.token
      if(!token){
        return res.status(401).json({message:"token not found"})
      }  
      let verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
      req.userId=verifyToken.userId
      next() // move to next middleware or controller
    } catch (error) {
      
        return res.status(401).json({message:`isauth error ${error}`})
    }
}
export default isAuth