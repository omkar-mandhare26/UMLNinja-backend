const generateFileName = (userId: string, diagramType: string) =>
    `${userId}_${diagramType}_${Date.now()}`;

export default generateFileName;
