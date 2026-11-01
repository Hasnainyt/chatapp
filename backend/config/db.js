import mongoose from "mongoose";

const connectdb=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("db connected")
    } catch (error) {
         console.error("Database connection error:", error.message);
    }
}
export default connectdb