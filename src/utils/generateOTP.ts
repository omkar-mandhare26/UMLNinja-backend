import nodemailer from "nodemailer";
import crypto from "crypto";

export const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

export const sendOTPEmail = async (recipientEmail: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: "Email Verification",
        text: `Verify your email to finish signing up with UMLi. 
        Use the following verification code: ${otp}.
        This will expire in the next 5 minutes minutes.`,
    };

    await transporter.sendMail(mailOptions);
};
