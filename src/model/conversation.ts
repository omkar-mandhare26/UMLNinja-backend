import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    diagramURL: {
        type: String,
        required: true,
    },
    plantUMLCode: {
        type: String,
        required: true,
    },
});

const Conversation = mongoose.model("conversations", conversationSchema);
export default Conversation;
