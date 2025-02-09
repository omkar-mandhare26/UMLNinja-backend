import type { Request, RequestHandler, Response } from "express";
import { generateOTP, sendOTPEmail } from "../utils/generateOTP.js";
import isValidEmail from "../utils/isValidEmail.js";
import Otp from "../model/otp.js";
import validator from "validator";

const sendOTP: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!validator.isEmail(email)) {
            res.status(401).json({
                isError: true,
                errMessage: "Invalid Email",
            });
            return;
        }

        const otp = generateOTP();
        sendOTPEmail(email, otp);

        const existingOtp = await Otp.findOne({ email });

        if (existingOtp) {
            res.status(200).json({
                message: "OTP already sent. Please check your email.",
                isError: false,
            });
            return;
        }

        const otpEntry = new Otp({
            email,
            otp,
        });

        await otpEntry.save();

        res.status(200).json({
            message: "OTP Sent Successfully",
            otp: otpEntry,
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

export default sendOTP;
