import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    diagramName: {
        type: String,
        required: true,
    },
    plantUMLCode: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Conversation = mongoose.model("conversations", conversationSchema);
export default Conversation;
