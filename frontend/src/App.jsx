import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import useGetCurrentUser from './customHooks/getCurrentUser' 
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import useGetOthertUsers from './customHooks/getOtherUsers'

const App = () => {
    const { userData, loading } = useSelector(state => state.user) // ← check currnt user details

    useGetCurrentUser() 
      useGetOthertUsers()
//Fires an API call to /api/user/current on every load/refresh to check if user is still logged

    if (loading) return <div>Loading...</div> // ← wait before redirecting

    return (
        <Routes>
            <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
            <Route path='/signup' element={!userData ? <Signup /> : <Navigate to="/profile" />} />
            <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
            <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
        </Routes>
    )
}

export default App