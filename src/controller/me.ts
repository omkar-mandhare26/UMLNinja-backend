import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const me = (req: Request, res: Response) => {
    const token =
        req.cookies.token || req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
        res.status(401).json({ message: "Unauthorized from me" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        if (typeof decoded !== "string" && "userId" in decoded) {
            res.status(200).json({
                user: decoded.userId,
                email: decoded.email,
                access: decoded.access,
                credits: decoded.totalCredits,
            });
        } else {
            res.status(401).json({
                message: "Invalid token from me",
                isError: true,
            });
        }
    } catch {
        res.status(401).json({
            message: "Invalid token from me",
            isError: true,
        });
    }
};

export default me;
