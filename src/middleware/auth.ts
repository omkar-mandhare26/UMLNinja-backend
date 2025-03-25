import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const auth: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token =
        req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Unauthorized From middleware" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        (req as any).user = decoded;
        next();
    } catch {
        res.status(401).json({
            message: "Invalid token From middleware",
            isError: true,
        });
    }
};

export default auth;
