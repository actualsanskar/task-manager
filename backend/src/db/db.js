import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/taskManager`)
        console.log(`MONGODB CONNECTED AT: ${response.connection.host}`)
    } catch (error) {
        console.log(`ERROR WHILE CONNECTING DATABASE AT: ${error.message}`);
    }
}

