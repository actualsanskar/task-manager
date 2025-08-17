import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const verifyUser = async (req, res, next) => {
    try {
        const accessToken =  req.cookies.accessToken || req.headers.accessToken;

        // console.log("accessToken: " + accessToken);
        
        if(!accessToken) throw new ApiError(401, "token not found, unauthorized access")
    
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY);

        const user = await User.findOne({email: decodedToken.email}).select("-password -refreshToken");

        if(!user){
            throw new ApiError(400, "access unauthorized!")
        }

        // i added toObject here because I don't need mongodb document instance and just need the user info
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        throw new ApiError(401, "incorrect token!")
    }
}

const verifyRefreshToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_KEY);
        return decodedToken;
    } catch (error) {
        console.log("Error while verifying refresh token: " + error);
    }
}

export {verifyRefreshToken}

export default verifyUser;