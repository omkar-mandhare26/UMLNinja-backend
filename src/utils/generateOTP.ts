import nodemailer from "nodemailer";
import crypto from "crypto";

export const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

export const sendOTPEmail = async (recipientEmail: string, otp: string) => {
    await sendEmail(
        recipientEmail,
        "Verify Email for UMLNinja",
        `Verify your email to finish signing up with UMLNinja. 
Use the following verification code: ${otp}.
This will expire in the next 5 minutes.`
    );
};

export const sendEmail = async (
    recipientEmail: string,
    subject: string,
    message: string
) => {
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
        subject: subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
};
