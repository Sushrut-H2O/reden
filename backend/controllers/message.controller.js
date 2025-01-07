import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Controller for sending a message
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        // Check if conversation already exists between sender and receiver
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        });

        // If there is no existing conversation, create one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // Add message to conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save conversation and message
        await Promise.all([conversation.save(), newMessage.save()])

        // Respond with the new message
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// Controller for retrieving messages in a conversation
export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        // Find conversation between sender and receiver
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");

        // If no conversation is found, return an empty array
        if(!conversation) return res.status(200).json([]);

        // Respond with messages in the conversation
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in get controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// Controller for upvoting a message
export const upvoteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const userId = req.user._id;

        // Find message by ID
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        // Toggle upvote
        if (message.upvotedBy.includes(userId)) {
            message.upvotedBy = message.upvotedBy.filter(id => id.toString() !== userId.toString());
            message.upvoteCount -= 1;
        } else {
            message.upvotedBy.push(userId);
            message.upvoteCount += 1;
            // Remove downvote if user had previously downvoted
            if (message.downvotedBy.includes(userId)) {
                message.downvotedBy = message.downvotedBy.filter(id => id.toString() !== userId.toString());
                message.downvoteCount -= 1;
            }
        }

        // Save message
        await message.save();

        // Respond with updated message
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in upvote controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Controller for downvoting a message
export const downvoteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const userId = req.user._id;

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        if (message.downvotedBy.includes(userId)) {
            message.downvotedBy = message.downvotedBy.filter(id => id.toString() !== userId.toString());
            message.downvoteCount -= 1;
        } else {
            message.downvotedBy.push(userId);
            message.downvoteCount += 1;
            if (message.upvotedBy.includes(userId)) {
                message.upvotedBy = message.upvotedBy.filter(id => id.toString() !== userId.toString());
                message.upvoteCount -= 1;
            }
        }

        await message.save();

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in downvote controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}