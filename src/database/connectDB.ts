import mongoose from "mongoose";

const connectDB = async (url: string) => {
    try {
        const conn = await mongoose.connect(url);
        console.log("Connected to MongoDB Successfully!");
        return conn;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error: ${err.message}`);
        } else {
            console.log("Unknown error");
        }
        process.exit(1);
    }
};

export default connectDB;
