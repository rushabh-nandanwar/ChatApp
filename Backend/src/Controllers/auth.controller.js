//Auth Controllers Functions (Signup, Login, Logout)

import User from"../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


// Signup Complete System - User,Email,Password Check, Email Already Exists, Hashing Password, Creating User, Generating Token, Returning User
export const signup = async (req, res) => {
    try {
        const {email, fullName, password} = req.body;

        if(!email || !fullName || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "Email already exists"});
        }

        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword
        })

        if(newUser){
            //JWT Token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })

        } else {
            return res.status(400).json({message: "Invalid credentials"});
        }

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
};


// Login Complete System - Email,Password Check, Hashing Password, Comparing Password, Generating Token, Returning User
export const login = async (req, res) => {
    
    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        generateToken(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }

};


// Logout Route - Clearing Token from Cookie
export const logout = (req, res) => {
    try {

        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {

        console.log("Error in Logout Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
};

//Update Profile Controller - Updating Profile Picture
export const updateProfile = async (req, res) => {

    try {

        const {profilePicture} = req.body;
        const userId = req.user;

        if (!profilePicture) {
            res.status(400).json({message: "Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        const updateUser = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url}, {new: true});

        res.status(200).json({message: "Profile picture updated successfully",});

    } catch (error) {

        console.log("Error in Update Profile Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }

};

//Check Auth Controller - Checking if the user is authenticated
export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({message: "User is authenticated", user});
    } catch (error) {
        console.log("Error in Check Auth Controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};