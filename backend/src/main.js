import { app } from "./app.js";
import { connectDB } from "./db/db.js";
import dotenv from 'dotenv';
dotenv.config();

function connectingDB(){
    connectDB().then(()=> {
        app.listen(process.env.PORT || 8000, ()=> {
            console.log(`Server connected at PORT: ${process.env.PORT}`);
        })
    })
} 

connectingDB();

