import type { Request, Response } from "express";
import { z } from "zod";
import User from "../model/user.js";
import userSchemaZod from "../zod/user.js";
import { createHashPassword } from "../utils/hash_password.js";
import { sendEmail } from "../utils/generateOTP.js";
import generateUserId from "../utils/generatorUserId.js";

const userSignup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const username = await generateUserId(email);
        const hashedPassword = await createHashPassword(password);
        const newUser = {
            userId: username,
            email,
            password: hashedPassword,
        };

        const user = new User(newUser);
        userSchemaZod.parse(newUser);
        await user.save();

        sendEmail(email, "Welcome to UMLNinja", "Welcome to UMLNinja!");

        res.status(200).json({
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
