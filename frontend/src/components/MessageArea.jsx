import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import dp from "../assets/dp.webp"

const MessageArea = () => {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector(state => state.user)

  return (
     <div className={`lg:w-[70%] w-full h-full bg-slate-600
        ${selectedUser ? "block" : "hidden"} lg:block`}>
        
    
        {selectedUser &&<div className='w-full h-20 bg-slate-800 shadow-gray-400 shadow-lg flex items-center px-5 gap-4'>
            
            {/* Back arrow */}
            <IoMdArrowRoundBack
                className=" w-6 h-6 cursor-pointer text-white"
                onClick={() => dispatch(setSelectedUser(null))} // ← go back to sidebar
            />

            {/* Selected user info */}
            {selectedUser && (
                <>
                    <div className=' w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400'>
                        <img src={selectedUser.image || dp} alt="profile" className='w-full h-full object-cover' />
                    </div>
                    <div>
                        <h1 className='select-none text-white font-semibold text-sm'>
                            {selectedUser.name || selectedUser.userName}
                        </h1>
                        <p className='text-emerald-400 text-xs'>Online</p>
                    </div>
                </>
            )} 
        </div>
              }

              {!selectedUser &&  
              <div className=' select-none w-full h-full flex flex-col justify-center items-center gap-4'>
                <h1 className=' font-bold text-5xl text-white'>Welcome to ChatApp 💬</h1>
                  <span className='text-black font-semibold text-3xl'>Share with your friends & Family </span>
                  <span className='text-lime-200 font-semibold text-3xl'>Chat Freely,User-Friendly </span>
              </div>
               }
       
    

    </div>
  )
}
export default MessageArea