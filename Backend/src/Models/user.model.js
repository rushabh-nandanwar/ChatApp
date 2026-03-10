// MongoDB Schema for User

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    fullName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: " "
    }
}, {
    timestamps: true
})

const User =  mongoose.model("User", userSchema);

export default User;