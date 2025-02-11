import sharp from "sharp";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function prepareWatermark(
    baseWidth: number,
    options: { opacity?: number; scale?: number }
) {
    const { opacity = 0.2, scale = 0.5 } = options;
    const watermarkPath = "./src/public/logo.png";
    return await sharp(watermarkPath)
        .resize(Math.floor(baseWidth * scale))
        .composite([
            {
                input: Buffer.from([255, 255, 255, Math.floor(opacity * 255)]),
                raw: {
                    width: 1,
                    height: 1,
                    channels: 4,
                },
                tile: true,
                blend: "dest-in",
            },
        ])
        .toBuffer();
}

async function calculateWatermarkPosition(
    imageInfo: sharp.Metadata,
    watermarkBuffer: Buffer
) {
    const watermarkInfo = await sharp(watermarkBuffer).metadata();
    return {
        left: Math.floor((imageInfo.width! - watermarkInfo.width!) / 2),
        top: Math.floor((imageInfo.height! - watermarkInfo.height!) / 2),
    };
}

async function addWatermark(imageName: string, options = {}) {
    const rootDir = process.env.ROOT_DIR || ".";
    const basePath = `${rootDir}/generation/diagram/`;

    const originalImagePath = `${basePath}${imageName}`;
    const tempImagePath = `${basePath}temp_${imageName}`;

    const imageInfo = await sharp(originalImagePath).metadata();
    const watermarkBuffer = await prepareWatermark(imageInfo.width!, options);
    const position = await calculateWatermarkPosition(
        imageInfo,
        watermarkBuffer
    );

    await sharp(originalImagePath)
        .composite([
            {
                input: watermarkBuffer,
                top: position.top,
                left: position.left,
                blend: "over",
            },
        ])
        .toFile(tempImagePath);

    fs.renameSync(tempImagePath, originalImagePath);
}

export default addWatermark;
