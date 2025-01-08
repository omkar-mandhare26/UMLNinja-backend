import type { Request, Response } from "express";
import Otp from "../model/otp.js";

const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        const otpEntry = await Otp.findOne({ email, otp });

        if (!otpEntry) {
            res.status(401).json({ isError: true, errMessage: "Invalid OTP" });
            return;
        }

        await Otp.deleteOne({ email });

        res.status(200).json({
            message: "Verification Done",
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

export default verifyOTP;
