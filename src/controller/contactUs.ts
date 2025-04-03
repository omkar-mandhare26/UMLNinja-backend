import { Request, Response } from "express";
import Contact from "../model/contact.js";

const contactUs = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message,
        });

        await newContact.save();
        res.status(201).json({
            message: "Contact request submitted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit contact request" });
    }
};

export default contactUs;
