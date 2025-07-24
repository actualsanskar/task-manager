import { verifyRefreshToken } from "../middlewares/auth.middleware.js";
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

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, updatedUser, "user successfully logged in")
    )
})

const resetPass = asyncHandler(async (req, res, next) => {
    const {currentPass, newPass} = req.body;

    const user = await User.findOne({email: req.user.email});
    
    const result = await user.checkPassword(currentPass);

    if(!result) throw new ApiError(401, "current password is incorrect!");

    user.password = newPass;
    const updatedUser = await user.save({validateBeforeSave: false});
    // console.log(updatedUser);
    

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedUser, "password changed successfully!")
    )

})

const userDetails = asyncHandler(async (req, res, next) => {
    return req.user;
})

const logout = asyncHandler(async (req, res, next) => {

    const user = req.user;
    user.refreshToken = null;
    await user.save({validateBeforeSave: false});

    return res
    .clearCookie("accessToken")
    .status(200)
    .json(
        new ApiResponse(200, {}, "user logged out succesfully")
    )
})

const generateNewAccessToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken || req.header.refreshToken;

    if(!refreshToken) throw new ApiError(500, "error while receiving refresh token");
    
    const decodedToken = verifyRefreshToken(refreshToken);
    
    const user = await User.findById({_id: decodedToken._id})
    
    if(!user) throw new ApiError(501, "unable to find user for verified refresh token!");

    const newAccessToken = await user.generateAccessToken();

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", newAccessToken, options)
    .json(
        new ApiResponse(200, newAccessToken, "new token generated successfully!")
    );

})

export {
    signup,
    login,
    resetPass,
    userDetails,
    logout,
    generateNewAccessToken
}