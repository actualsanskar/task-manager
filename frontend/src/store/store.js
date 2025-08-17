import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import taskSlice from './taskSlice.js'

export default configureStore({
    reducer: {
        auth: authSlice,
        todo: taskSlice
    },
})