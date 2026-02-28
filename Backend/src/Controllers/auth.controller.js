import User from"../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

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

export const logout = (req, res) => {
    res.send("Logout route");
};

export const login = (req, res) => {
    res.send("Login route");
};