import { createHashPassword } from "../utils/hash_password.js";
import CreditHistory from "../model/creditTransaction.js";
import generateUserId from "../utils/generatorUserId.js";
import { sendEmail } from "../utils/generateOTP.js";
import type { Request, Response } from "express";
import userSchemaZod from "../zod/user.js";
import Credit from "../model/credit.js";
import User from "../model/user.js";
import { z } from "zod";

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

        userSchemaZod.parse(newUser);
        const user = new User(newUser);
        await user.save();

        const credits = new Credit({
            user: user._id,
            totalCredits: 5,
            updatedAt: Date.now(),
        });

        const creditTrans = new CreditHistory({
            user: user._id,
            creditUsed: 5,
            action: "Signup Credits",
            timestamp: Date.now(),
        });

        await credits.save();
        await creditTrans.save();

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
