import fs from "fs";
import type { Request, Response } from "express";
import { exec } from "child_process";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();
const modelsnames = ["claude-3-haiku-20240307", "claude-3-5-sonnet-20241022"];
const apiKey = process.env.CLAUDE_API_KEY;
if (!apiKey) {
    console.error("CLAUDE_API_KEY is not defined in the .env file");
    process.exit(1);
}
const anthropic = new Anthropic({
    apiKey,
});

const userQuery = async (req: Request, res: Response) => {
    try {
        const { systemPrompt, userPrompt } = req.body;
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1000,
            temperature: 0,
            system: systemPrompt,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: userPrompt,
                        },
                    ],
                },
            ],
        });
        const rawCode =
            response.content.find((block) => block.type === "text")?.text || "";
        const diagramCode = rawCode
            ? rawCode.replace(/^```plantuml\n/, "").replace(/```$/, "")
            : "";

        const fileName = "diagram.puml";
        fs.writeFile(fileName, diagramCode, (err) => {
            if (err instanceof Error) {
                console.log(`Error: ${err.message}`);
                process.exit(1);
            }
        });

        const command = `java -jar plantuml.jar -o "./src/public" diagram.puml`;
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error executing PlantUML: ${err.message}`);
                return;
            }
            if (stderr) {
                console.error(`PlantUML stderr: ${stderr}`);
            }
            console.log("Diagram generated successfully!");
        });

        res.json({ diagramCode });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ isError: true, errMessage: err.message });
            console.log(`Error: ${err.message}`);
        } else {
            res.status(500).json({
                isError: true,
                errMessage: "Unknown Error",
            });
            console.log("Unknown error");
        }
    }
};

export default userQuery;
