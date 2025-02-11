import fs from "fs";

async function generatePlantUMLCode(content: string, filename: string) {
    await fs.promises.writeFile(`./generation/code/${filename}`, content);
}

export default generatePlantUMLCode;
