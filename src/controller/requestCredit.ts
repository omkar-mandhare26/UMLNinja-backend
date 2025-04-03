import { Request, Response } from "express";
import creditRequest from "../model/creditRequest.js";

const requestCredits = async (req: Request, res: Response) => {
    try {
        const { name, email, plan, utrNumber } = req.body;

        if (!name || !email || !plan || !utrNumber) {
            res.status(401).json({ errMessage: "Invalid Inputs" });
            return;
        }

        const newReq = new creditRequest({
            name,
            email,
            plan,
            tnxId: utrNumber,
        });

        await newReq.save();

        res.status(200).json({ message: "Request accepted succuessfully" });
    } catch (err) {
        res.status(500).json({ errMessage: "Server Error" });
    }
};

export default requestCredits;
