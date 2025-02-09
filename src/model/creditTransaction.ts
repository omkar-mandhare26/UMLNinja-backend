import mongoose from "mongoose";

const creditTransactionSchema = new mongoose.Schema({
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
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
    },
});

const CreditTransaction = mongoose.model("users", creditTransactionSchema);
export default CreditTransaction;
