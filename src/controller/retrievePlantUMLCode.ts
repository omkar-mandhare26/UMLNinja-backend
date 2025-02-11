import type { Request, Response, RequestHandler } from "express";
import path from "path";
import fs from "fs";
import axiosInstance from "../utils/axiosInstance.js";
const retrievePlantUMLCode: RequestHandler = async (
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
        const rootDir = process.env.ROOT_DIR;
        if (!rootDir) {
            res.status(500).send(
                "ROOT_DIR is not defined in the environment variables."
            );
            return;
        }

        const filePath = path.join(
            rootDir,
            `generation/code/${diagramId}.puml`
        );
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return res.status(404).send("Diagram not found.");
            }
            res.type("text/plain").send(data);
        });
    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({ errMessage: err.message });
        else res.status(500).json({ errMessage: "Unknown Error" });
    }
};

export default retrievePlantUMLCode;
