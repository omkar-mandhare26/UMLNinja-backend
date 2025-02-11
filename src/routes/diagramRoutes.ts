import retrievePlantUMLCode from "../controller/retrievePlantUMLCode.js";
import retrievePNGDiagram from "../controller/retrievePNGDiagram.js";
import retrieveSVGDiagram from "../controller/retrieveSVGDiagram.js";
import auth from "../middleware/auth.js";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const diagramRouter = Router();

diagramRouter.use(auth);

diagramRouter.get("/retrieve-png-diagram/:diagramId", retrievePNGDiagram);

// Only Professional access
diagramRouter.get("/retrieve-plantuml-code/:diagramId", retrievePlantUMLCode);
diagramRouter.get("/retrieve-svg-diagram/:diagramId", retrieveSVGDiagram);

export default diagramRouter;
