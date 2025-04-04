import type { Request, RequestHandler, Response } from "express";
import axiosInstance from "../utils/axiosInstance.js";
import path from "path";

const retrieveSVGDiagram: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const token =
            req.cookies.token ||
            req.header("Authorization")?.replace("Bearer ", "");
        const { access } = (
            await axiosInstance.post(
                "/user/me",
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
        ).data;
        if (access != "professional") {
            res.status(401).json({
                errMessage: "You don't have access to uml code",
            });
            return;
        }

        const { diagramId } = req.params;
        const rootDir: string = process.env.ROOT_DIR || ".";
        const filePath = path.join(
            rootDir,
            `/generation/diagram/${diagramId}.svg`
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

export default retrieveSVGDiagram;
