import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            default: null
        }
    }, {timestamps: true}
)

userSchema.pre('save', async function (next){
    if(!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.checkPassword = async function (pass) {       
    return await bcrypt.compare(pass, this.password)  
}

userSchema.methods.generateAccessToken = function() {
    try {
        return jwt.sign({username: this.username, email: this.email}, process.env.JWT_ACCESS_TOKEN_KEY, {expiresIn: process.env.JWT_ACCESS_EXPIRY_KEY});
    } catch (error) {
        console.log("error while generating access token: " + error);
    }
}

userSchema.methods.generateRefreshToken = function() {
try {
        return jwt.sign({username: this.username}, process.env.JWT_REFRESH_TOKEN_KEY, {expiresIn: process.env.JWT_REFRESH_EXPIRY_KEY});
} catch (error) {
    console.log("error while generating refresh token: " + error);
}}

export const User = mongoose.model("User", userSchema);