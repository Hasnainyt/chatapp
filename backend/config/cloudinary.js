import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
const  uploadOnCloudinary=async (filePath)=>{
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_APISECRET
})
try {
    const uploadResult=await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath)
    return uploadResult.secure_url

} catch (error) {
    fs.unlinkSync(filePath)
     console.error("Cloudinary upload failed:", error)
}
}

export default uploadOnCloudinary
/*
 * Uploads a file to Cloudinary and removes it locally.
 * @param {string} filePath - Path of the file stored locally
 * @returns {string|null} - Secure URL of uploaded file or null if failed
 */