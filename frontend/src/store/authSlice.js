import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authStatus: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            authStatus = true,
            user = action.payload
        },
        logout: (state, action) => {
            authStatus = false,
            user = null
        }
    },
})

export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer