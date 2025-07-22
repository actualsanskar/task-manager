import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const authUser = async (req, res, next) => {
    try {
        const accessToken =  req.cookies.accessToken || req.headers.accessToken;

        // console.log("accessToken: " + accessToken);
        
        if(!accessToken) throw new ApiError(401, "token not found, unauthorized access")
    
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({email: decodedToken.email});

        if(!user){
            throw new ApiError(400, "access unauthorized!")
        }

        req.user = user
        next();

    } catch (error) {
        console.log(error);
        throw new ApiError(400, "incorrect token!")
    }
}

export default authUser;