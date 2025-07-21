import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (user) => {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {accessToken, refreshToken};

}

const signup = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        throw new ApiError(400, "enter all the necessary details!");
    }

    const existingUser = await User.findOne({
        username
    });

    if(existingUser){
        throw new ApiError(401, "User already exists!");
    }

    const user = await User.insertOne({
        username,
        email,
        password
    })

    if(!user){
        throw new ApiError(500, "error while creating registration!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Registered user successfully!")
    )
})

const login = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    
    if(!email || !password){
        throw new ApiError(400, "enter all the necessary details!");
    }
    
    const user = await User.findOne({email});

    if(!user) throw new ApiError(400, "no such user exist");

    const checkPass = await user.checkPassword(password);

    if(!checkPass){
        throw new ApiError(401, "password is incorrect!");
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);

    if(!accessToken || !refreshToken ) throw new ApiError(500, "error in access or refresh token");
    
    const updatedUser = await User.findOne({email});

    return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
        new ApiResponse(200, updatedUser, "user successfully logged in")
    )
})




export {
    signup,
    login
}