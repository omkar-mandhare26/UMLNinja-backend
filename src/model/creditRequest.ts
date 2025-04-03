import mongoose from "mongoose";

const creditRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    tnxId: {
        type: String,
        default: "free",
        required: true,
    },
});

const creditRequest = mongoose.model("creditRequest", creditRequestSchema);
export default creditRequest;
