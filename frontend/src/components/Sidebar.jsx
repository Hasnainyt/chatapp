import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { FaUserEdit } from "react-icons/fa";
import { serverUrl } from '../main'
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice'
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
    let { userData, otherUsers,selectedUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let [search, setSearch] = useState(false)

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`lg:w-[30%] w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col py-4 px-4 gap-3 shadow-xl
        ${!selectedUser ? "block" : "hidden"} lg:block`}>

            <button
                onClick={() => navigate("/profile")}
                className='flex items-center ml-auto cursor-pointer px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs transition-all duration-300 hover:scale-105'
            >
             <FaUserEdit /> Edit Profile  
            </button>

            {/* App Title */}
            <div className='text-center select-none cursor-default'>
                <h1 className='text-emerald-400 font-bold text-2xl tracking-widest'>ChatApp</h1>
                <p className='text-slate-400 text-sm tracking-wider mt-1'>Welcome back 👋 {userData?.name || "user"}</p>
            </div>

            {/* Profile Section */}
            <div className='flex items-center gap-4 w-full px-2'>
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full border-2 border-emerald-400 shadow-lg shadow-emerald-900 overflow-hidden flex-shrink-0">
                    <img src={userData?.image || dp} alt="profile" className="w-full h-full object-cover" />
                </div>

                {/* Name + badge */}
                <div className='flex flex-col select-none cursor-default'>
                    <h2 className='text-white font-semibold text-sm'>
                        {userData?.name || userData?.userName || "User"}
                    </h2>
                    <div className='flex items-center gap-1'>
                        <div className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                        <span className='text-emerald-400 text-xs'>Online</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className='w-full h-[1px] bg-slate-700' />

            {/* Search */}
            {!search && (
                <div
                    className='w-8 h-8 mt-2 rounded-full flex justify-center items-center bg-white cursor-pointer'
                    onClick={() => setSearch(true)}
                >
                    <FaSearch className='w-4 h-4 text-slate-700' />
                </div>
            )}

            {search && (
                <div className='flex items-center gap-2 mt-2 w-full bg-white rounded-full px-3 py-1'>
                    <FaSearch className='w-4 h-4 text-slate-400 flex-shrink-0' />
                    <input
                        type="text"
                        placeholder='Search users...'
                        className='w-full outline-none border-none text-sm text-slate-700 bg-transparent'
                        autoFocus
                    />
                    <ImCross
                        className='w-3 h-3 text-slate-400 cursor-pointer flex-shrink-0'
                        onClick={() => setSearch(false)}
                    />
                </div>
            )}

            {/* user list */}
            <div className='w-full h-[60vh] overflow-auto flex flex-col gap-3 items-center mt-5'>
                {otherUsers?.map((user) => (
                    <div
                     key={user._id}
                         onClick={()=>dispatch(setSelectedUser(user))}
                        className='select-none  w-[90%] h-14 flex items-center gap-3 bg-slate-700 rounded-full cursor-pointer hover:bg-emerald-500 transition-all duration-300'
                    >
                        <div className='w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-emerald-400'>
                            <img
                                src={user.image || dp}
                                alt="profilePic"
                                className='w-full h-full object-cover'
                            />
                        </div>

                        <h1 className='text-white font-semibold text-sm'>
                            {user.name || user.userName}
                        </h1>
                    </div>
                ))}
            </div>

            {/* Logout button — pinned to bottom */}
        <div className='flex justify-end pb-2'>
    <button
        onClick={handleLogout}
        className='flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-red-900'
    >
        <TbLogout className='w-4 h-4' />
        Logout
    </button>
     </div>
        </div>
    )
}

export default Sidebar