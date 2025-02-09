import mongoose from "mongoose";
import { datetimeRegex } from "zod";

const creditSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    totalCredits: {
        type: Number,
        default: 5,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const Credit = mongoose.model("credits", creditSchema);
export default Credit;
