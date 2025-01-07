import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    upvoteCount:{
        type:Number,
        default:0
    },
    downvoteCount:{
        type:Number,
        default:0
    },
    upvotedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    downvotedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }]
}, {timestamps:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;