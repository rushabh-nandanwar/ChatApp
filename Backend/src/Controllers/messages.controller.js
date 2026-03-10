import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../lib/cloudinary.js";  

export const getUserForSidebar = async (req, res) => {

    try {

        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filterUsers);

    } catch (error) {
        
        console.log("Error in getUserForSidebar", error.message);
        res.status(500).json({message: "Internal Server Error"});
    
    }

};

export const getMessages = async (req, res) => {
    try {
        
        const {id: userToChatID} = req.params;
        const receiverId = userToChatID;
        const myId = req.user._id;

        const messages = await Message.find({

            $or:[
                {senderId: myId, receiverId: receiverId},
                {senderId: receiverId, receiverId: myId}
            ]

        })

        res.status(200).json(messages);

    } catch (error) {

        console.log("Error in getMessages", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
}

export const sendMessage = async (req, res) => {

    try {

        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;


        let imageURL;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadResponse.secure_url;
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL,
        });

        await newMessage.save();

        // realtime Functionalities will be implemented Here => Socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        
        console.log("Error in sendMessage", error.message);
        res.status(500).json({message: "Internal Server Error"});
        
    }

}