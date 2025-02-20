import cloudinary from "../lib/cloudinary.js";

import { findAllExceptUser } from "../repository/user.repository.js";
import {
  findChatBetween,
  createNewMessage,
} from "../repository/message.repository.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await findAllExceptUser(loggedInUserId);

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUsersForSidebar: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await findChatBetween(myId, userToChatId);

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      // upload base64 imagte to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await createNewMessage(
      senderId,
      receiverId,
      text,
      imageUrl
    );

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
