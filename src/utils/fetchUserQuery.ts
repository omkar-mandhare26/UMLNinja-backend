import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const apiKey = process.env.CLAUDE_API_KEY;
if (!apiKey) {
    console.error("CLAUDE_API_KEY is not defined in the .env file");
    process.exit(1);
}
const anthropic = new Anthropic({
    apiKey,
});

const fetchUserQuery = async (systemPrompt: string, userPrompt: string) => {
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

    return diagramCode;
};

export default fetchUserQuery;
