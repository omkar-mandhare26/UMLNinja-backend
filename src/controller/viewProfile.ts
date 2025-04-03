import Conversation from "../model/conversation.js";
import { Request, Response } from "express";
import Credit from "../model/credit.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

const viewProfile = async (req: Request, res: Response) => {
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

        const creditsRcr = await Credit.findOne({ user: user?._id });
        const totalDiagrams = await Conversation.countDocuments({
            user: user?._id,
        });

        res.status(200).json({
            username: user?.userId,
            email: user?.email,
            plan: user?.plan,
            credits: creditsRcr?.totalCredits,
            totalDiagrams: totalDiagrams,
        });
    } catch (err) {
        res.status(500).json({ errMessage: "Server Error" });
    }
};

export default viewProfile;
