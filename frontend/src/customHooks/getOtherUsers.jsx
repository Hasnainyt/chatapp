import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main"
import { setUserData, setLoading, setOtherUsers } from "../redux/userSlice" // ← add setLoading

const useGetOthertUsers = () => {
    const dispatch = useDispatch()
    let {userData}=useSelector(state=>state.user)

    useEffect(() => { //runs 1 time on evry refresh
        const fetchUser = async () => {
            dispatch(setLoading(true)) // ← start loading
            try {
                const result = await axios.get(`${serverUrl}/api/user/others`, { withCredentials: true })//send cookie to backend
                dispatch(setOtherUsers(result.data))
            } catch (error) {
                if (error.response?.status === 401) {
                    dispatch(setOtherUsers(null))
                } else {
                    console.log(error)
                }
            } finally {
                dispatch(setLoading(false)) // ← always stop loading
            }
        }
        fetchUser()
    }, [userData])
}

export default useGetOthertUsers