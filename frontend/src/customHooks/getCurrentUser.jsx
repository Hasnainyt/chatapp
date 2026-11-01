import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { serverUrl } from "../main"
import { setUserData, setLoading } from "../redux/userSlice" // ← add setLoading

const useGetCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => { //runs 1 time on evry refresh
        const fetchUser = async () => {
            dispatch(setLoading(true)) // ← start loading
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })//send cookie to backend
                dispatch(setUserData(result.data))
            } catch (error) {
                if (error.response?.status === 401) {
                    dispatch(setUserData(null))
                } else {
                    console.log(error)
                }
            } finally {
                dispatch(setLoading(false)) // ← always stop loading
            }
        }
        fetchUser()
    }, [])
}

export default useGetCurrentUser