import { Request, Response } from "express";
import Conversation from "../model/conversation.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

const deleteDiagram = async (req: Request, res: Response) => {
    try {
        const { diagramName } = req.body;
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

        if (!user) {
            res.status(404).json({ errMessage: "User not found" });
            return;
        }

        const deletedDiagram = await Conversation.findOneAndDelete({
            diagramName: diagramName,
        });

        if (!deletedDiagram) {
            res.status(404).json({ errMessage: "Diagram not found" });
            return;
        }

        res.status(200).json({
            message: "Diagram deleted successfully",
            deletedDiagram,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                isError: true,
                errMessage: `Error deleting diagram: ${err.message}`,
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

export default deleteDiagram;
