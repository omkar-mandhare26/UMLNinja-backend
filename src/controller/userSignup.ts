import type { Request, Response } from "express";
import { z } from "zod";
import User from "../model/user.js";
import userSchemaZod from "../zod/user.js";

const userSignup = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const username =
            `${firstName}${lastName}`.toLowerCase() +
            Math.floor(100000 + Math.random() * 900000);

        const newUser = {
            userId: username,
            firstName,
            lastName,
            email,
            password,
        };

        const user = new User(newUser);
        userSchemaZod.parse(newUser);
        await user.save();

        res.status(200).json({
            user,
            message: "Signup Successful",
            isError: false,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ isError: true, errMessage: err.message });
            console.log(`Error: ${err.message}`);
        } else if (err instanceof z.ZodError) {
            res.status(400).json({
                isError: true,
                errMessage: err.errors,
            });
            console.log(`Error: ${err.errors}`);
        } else {
            res.status(500).json({
                isError: true,
                errMessage: "Internal server error.",
            });
            console.log("Error signing up.");
        }
    }
};

export default userSignup;
