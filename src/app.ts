import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const mongodb_url: string = process.env.MONGODBURL || "";

if (!mongodb_url)
    throw new Error("MONGO_DB_URL is not defined in the environment variables");
connectDB(mongodb_url);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        // origin: "http://localhost:5173",
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Hello World There");
});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});

const diagramNames = [
    "Class",
    "Use Case",
    "Activity",
    "Component",
    "State",
    "Object",
    "Sequence",
    "Deployment",
    "State",
];
