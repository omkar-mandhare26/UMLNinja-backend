import { Request, Response } from "express";
import Conversation from "../model/conversation.js";
import axiosInstance from "../utils/axiosInstance.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
const getAllDiagrams = async (req: Request, res: Response) => {
    try {
        const token =
            req.cookies.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ errMessage: "No token provided" });
            return;
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }
        const decoded = jwt.verify(token, secretKey) as { userId: string };
        const user = await User.findOne({ userId: decoded.userId });

        const conversations = await Conversation.find({ user: user?._id });

        res.json({ diagrams: conversations });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                isError: true,
                errMessage: `Error fetching diagrams: ${err.message}`,
            });
            console.log(`Error: ${err.message}`);
        } else {
            res.status(500).json({
                isError: true,
                errMessage: "Unknown Error",
            });
            console.log("Unknown error");
        }
    }
};

export default getAllDiagrams;
