import { Router } from "express";
const route = Router();
import { signup, login } from "../controllers/user.controllers.js";

route.post('/auth/signup', signup)
route.post('/auth/login', login)
// route.get('/all-tasks', )
// route.get('/add-task', )
// route.get('/delete-task', )
// route.get('/edit-task', )


export default route;