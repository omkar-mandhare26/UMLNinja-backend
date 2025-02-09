import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    transactionId: {
        type: String,
        unique: true,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const Transaction = mongoose.model("transactions", transactionSchema);
export default Transaction;
