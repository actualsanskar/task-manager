import { Router } from "express";
const route = Router();
import { signup, login, resetPass } from "../controllers/user.controllers.js";
import authUser from "../middlewares/auth.middleware.js";


route.post('/auth/signup', signup);
route.post('/auth/login', login);

// authorized routes
route.post('/auth/reset-password',authUser, resetPass);
// route.post('/logout', authUser, )


export default route;