import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({Message: "Unauthorized, No token provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) {
            return res.status(401).json({Message: "Unauthorized, Invalid token"});
        }

        const user = await User.findById(decode.userID).select("-password");

        if (!user) {
            return res.status(404).json({Message: "User not found"});
        }

        //Now the User is Validated
        req.user = user;
        next();

    } catch (error) {

        console.log("Error in Protect Route Middleware", error.message);
        return res.status(500).json({Message: "Internal Server Error"});

    }

};