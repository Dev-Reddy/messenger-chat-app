import Message from "../models/message.model.js";

export const findChatBetween = async (myId, userToChatId) => {
  try {
    return await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createNewMessage = async (senderId, receiverId, text, image) => {
  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image,
    });

    return await newMessage.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
