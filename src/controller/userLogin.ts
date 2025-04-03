import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";
import { checkPassword } from "../utils/hash_password.js";
import Credit from "../model/credit.js";
dotenv.config();

const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const credits = await Credit.findOne({ user: user?._id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const match = await checkPassword(password, user.password);
        if (!match) {
            res.status(401).json({
                isError: true,
                errMessage: "Wrong Credentials",
            });
            return;
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }
        const token = jwt.sign(
            {
                userId: user.userId,
                email,
                access: user.plan,
                credits: credits?.totalCredits,
                type: "user",
            },
            secretKey,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login Success",
            user: user.userId,
            token,
            isError: false,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error Occurred: ${err.message}`);
            res.status(500).json({ isError: true, errMessage: err.message });
            return;
        } else {
            console.log(`Unknown Error`);
            res.status(500).json({
                isError: true,
                errMessage: "Unknown Error",
            });
            return;
        }
    }
};

export default userLogin;
