import type { Request, RequestHandler, Response } from "express";
import path from "path";
import fs from "fs";

const retrievePNGDiagram: RequestHandler = (req: Request, res: Response) => {
    try {
        const { diagramId } = req.params;
        const rootDir: string = process.env.ROOT_DIR || ".";
        const filePath = path.join(
            rootDir,
            `/generation/diagram/${diagramId}.png`
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res
                    .status(404)
                    .json({ isError: true, errMessage: "Diagram not found" });
            }
            res.setHeader("Content-Type", "application/octet-stream");
            res.send(data);
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ errMessage: err.message });
        }
    }
};

export default retrievePNGDiagram;
