import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Credit from "../model/credit.js";

const getMyPlan = async (req: Request, res: Response) => {
    const token =
        req.cookies.token || req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
        res.status(401).json({ message: "Unauthorized from getMyPlan" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        if (typeof decoded !== "string" && "email" in decoded) {
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            const credits = await Credit.findOne({ user: user._id });
            if (!credits) {
                res.status(401).json({ message: "No credits found" });
                return;
            }

            res.json({
                plan: user.plan,
                credits: credits.totalCredits,
            });
        } else {
            res.status(401).json({
                message: "Invalid token from getMyPlan",
            });
        }
    } catch {
        res.status(401).json({
            message: "Invalid token from getMyPlan",
        });
    }
};

export default getMyPlan;
