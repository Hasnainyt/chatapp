import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        otherUsers:null,
        selectedUser:null,
        loading: true // ← start as true,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
         setOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
    }
})

export const { setUserData, setLoading ,setOtherUsers,setSelectedUser} = userSlice.actions
export default userSlice.reducer