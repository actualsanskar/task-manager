import { Router } from "express";
const route = Router();
import { signup, login, resetPass, userDetails, logout, generateNewAccessToken } from "../controllers/user.controllers.js";
import verifyUser from "../middlewares/auth.middleware.js";


route.post('/auth/signup', signup);
route.post('/auth/login', login);

// authorized routes
route.post('/auth/reset-password', verifyUser, resetPass);
route.post('/account', verifyUser, userDetails)
route.post('/logout', verifyUser, logout)
route.post('/new-refresh-token', verifyUser, generateNewAccessToken)


export default route;