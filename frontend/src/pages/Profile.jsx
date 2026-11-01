import React, { useEffect, useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';
//`useRef` gives you **direct access to a DOM element** in React without using `getElementById


const Profile = () => {
  let {userData}=useSelector(state=>state.user)
  let navigate=useNavigate()
  let [name,setName]=useState(userData?.name || "")
   let [frontimg,setFrontImg]=useState(userData?.image || dp)
   let [backimg,setBackImg]=useState(null)
   let image=useRef()
   let dispatch=useDispatch()
   let[saving,setSaving]=useState(false)

  useEffect(() => {
  if (!userData) navigate("/login")
     }, [userData, navigate])

   const handleImg=(e)=>{
    let file=e.target.files[0]
    setBackImg(file)
    setFrontImg(URL.createObjectURL(file))
   }
  const handleProfile= async(e)=>{
    setSaving(true)
    e.preventDefault()
    try {
      let formData=new FormData()
      formData.append("name",name)
      if(backimg){
        formData.append("image",backimg)
      }
      let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
         dispatch(setUserData(result.data))
         setSaving(false)
         navigate("/")
    } catch (error) {
      setSaving(false)
      console.log(error)
    }
  }
  return (
    <div className="w-full min-h-screen bg-slate-200 flex items-center justify-center">
    
      <div className="w-full max-w-[500px] h-[550px] bg-white rounded-lg shadow-lg shadow-gray-500 flex flex-col items-center pt-10">
       
          <IoMdArrowRoundBack 
    className="absolute left-4 top-4 w-6 h-6 cursor-pointer text-gray-700" 
    onClick={()=>navigate("/")}
  />

        {/* Middle Section: Profile Image */}
        <div className="relative w-[150px] h-[150px] mb-6">
          <div 
          className="w-full h-full rounded-full border-2 border-slate-500 shadow-lg shadow-gray-400 overflow-hidden">
            <img src={frontimg} alt="profile" className="w-full h-full object-cover" />
          </div>

          {/* Camera Icon */}
          <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer">
            <FaCamera onClick={()=>image.current.click()} className="text-gray-700 w-5 h-5" />
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleProfile}
        className="w-full flex flex-col items-center gap-6">
          <input type="file" hidden accept='image/*' ref={image}  onChange={handleImg}/>
          <input 
            type="text" 
            placeholder='Enter your name' 
            className="w-[90%] h-[50px] outline-none border-2 border-emerald-200 px-5 py-3 bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-lg focus:border-green-400 focus:ring-2 focus:ring-green-200"
          onChange={(e)=>setName(e.target.value)} value={name}
          />

          <input 
            type="text" 
            readOnly
            disabled
            value={userData?.userName || ""}
            className="w-[90%] h-[50px] cursor-not-allowed outline-none border-2 border-emerald-200 px-5 py-3 bg-gray-100 rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-lg"
          />

          <input 
            type="email" 
            readOnly
            disabled
                 value={userData?.email || ""}
            className="w-[90%] h-[50px] cursor-not-allowed outline-none border-2 border-emerald-200 px-5 py-3 bg-gray-100 rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-lg"
          />
        <button disabled={saving} className="px-4 py-2 bg-green-400 rounded-xl shadow-lg shadow-gray-400 
            text-xl w-35 mt-4 font-semibold text-white
          hover:bg-green-500 hover:scale-105 transition-transform duration-300">{saving?"saving..":"Save Profile"}</button>
        </form>

      </div>

    </div>
  )
}

export default Profile