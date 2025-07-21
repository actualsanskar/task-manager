import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
const app = express();
import userRoute from "./routes/user.routes.js"

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// test route

// user routes
app.use('/api/v1', userRoute)

app.get('/' , (req, res, next)=> {
    res.send("HELLO SERVER")
})


export {app};