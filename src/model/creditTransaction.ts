import mongoose from "mongoose";

const creditHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    creditUsed: {
        type: Number,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const CreditHistory = mongoose.model("creditHistory", creditHistorySchema);
export default CreditHistory;
