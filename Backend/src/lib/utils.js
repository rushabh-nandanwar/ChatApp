//JWT Token Generation and Cookie Setting

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userID, res) => {
    
    const token = jwt.sign({userID}, process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //Prevent XSS attacks
        sameSite: "strict", //Prevent CSRF attacks
        secure: process.env.NODE_ENV === "production", //Prevent CSRF attacks
    })

    return token;
};