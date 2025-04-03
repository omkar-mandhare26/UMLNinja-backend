import { Request, Response } from "express";
import Conversation from "../model/conversation.js";

const getDiagramDetails = async (req: Request, res: Response) => {
    try {
        const { diagramName } = req.body;
        const diagramDetails = await Conversation.findOne({ diagramName });

        if (!diagramDetails) {
            res.status(404).json({ errMessage: "Diagram Not Found" });
            return;
        }

        res.status(200).json({
            diagramType: diagramDetails?.type,
            userPrompt: diagramDetails?.query,
            png_url: `http://localhost:5050/api/diagram/retrieve-png-diagram/${diagramDetails?.diagramName}`,
            image_name: diagramDetails?.diagramName,
        });
    } catch (err) {
        res.status(500).json({ errMessage: "Server Error" });
    }
};

export default getDiagramDetails;
