import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const mongodb_url: string = process.env.MONGODB_URL || "";

if (!mongodb_url)
    throw new Error("MONGO_DB_URL is not defined in the environment variables");
connectDB(mongodb_url);

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World There");
});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});
