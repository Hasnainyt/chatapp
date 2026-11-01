import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
    let navigate=useNavigate()
    let [show,setshow]=useState(false)
    let [userName,setuserName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState("")
    let dispatch=useDispatch()

    const handleSignup=async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            let result=await axios.post(`${serverUrl}/api/auth/signup`,
                {userName,email,password},
                {withCredentials:true})
                // send user data from API response to Redux store
                 dispatch(setUserData(result.data))
                 navigate("/profile")
                setuserName("")
                setEmail("")
                setPassword("")
                setLoading(false)
                setErr("")
         
        } catch (error) {
            console.log(error)
            setLoading(false)
             setErr(error?.response?.data?.message)
        }
    }
  return (
    <div className="w-full min-h-screen bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-lg shadow-gray-500 flex flex-col gap-[30px]">
        
        <div className="w-full h-[200px] bg-green-300 rounded-b-[30%] shadow-lg shadow-gray-400 flex items-center justify-center gap-2">
       <h1 className="text-black font-bold text-[30px]">Welcome to </h1>
       <span className="text-white font-bold text-[30px]"> ChatApp</span>
       </div>
       <form className="w-full flex flex-col gap-5 items-center" onSubmit={handleSignup}>
        <input type="text" placeholder="username" className="w-[90%] h-[50px]
        outline-none border-2 border-emerald-200 px-5 py-3 bg-white
        rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-lg
        focus:border-green-400 focus:ring-2 focus:ring-green-200" 
        onChange={(e)=>setuserName(e.target.value)} value={userName}/>

        <input type="email" placeholder="email" className="w-[90%] h-[50px]
        outline-none border-2 border-emerald-200 px-5 py-3 bg-white
        rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-lg
        focus:border-green-400 focus:ring-2 focus:ring-green-200" 
        onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <div
          className="w-[90%] h-[50px] border-2 border-emerald-200 px-5 py-3 bg-white
          rounded-lg shadow-lg shadow-gray-400 text-gray-700 overflow-hidden relative
         focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-200"
         >
          <input
            type={`${show?"text":"password"}`}
          placeholder="Password"
         className="w-full h-full outline-none bg-transparent"
         onChange={(e)=>setPassword(e.target.value)} value={password}
        />
        <span className="absolute top-3 right-5 text-xl text-black font-semibold cursor-pointer"
        onClick={()=>setshow(prev=>!prev)}>{show ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        {err && <p className='text-red-500'>{err}</p>}
        <button
          className="px-5 py-3 bg-green-400 rounded-xl shadow-lg shadow-gray-400 
            text-xl w-40 mt-5 font-semibold text-white
          hover:bg-green-500 hover:scale-105 transition-transform duration-300"
          disabled={loading}
        >
        {loading?"Loading...":"Sign Up"}
       </button>
       <p className="cursor-pointer">Already have an Account ?<span className="text-blue-600 font-bold "onClick={()=>navigate("/login")}>Login</span></p>

       </form>
      </div>
      
    </div>
  );
};

export default Signup;