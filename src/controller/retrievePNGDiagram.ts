import type { Request, RequestHandler, Response } from "express";
import path from "path";

const retrievePNGDiagram: RequestHandler = (req: Request, res: Response) => {
    try {
        const { diagramId } = req.params;
        const rootDir: string = process.env.ROOT_DIR || ".";
        const filePath = path.join(
            rootDir,
            `/generation/diagram/${diagramId}.png`
        );

        res.sendFile(filePath, (err) => {
            if (err) {
                if ((err as any).code === "ENOENT") {
                    return res.status(404).json({
                        isError: true,
                        errMessage: "Diagram not found",
                    });
                }
                res.status(500).json({
                    isError: true,
                    errMessage: err.message,
                });
            }
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ errMessage: err.message });
        }
    }
};

export default retrievePNGDiagram;
