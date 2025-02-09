import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    projectDate: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model("projects", projectSchema);
export default Project;
