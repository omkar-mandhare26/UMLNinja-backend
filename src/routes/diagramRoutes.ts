import deleteDiagram from "../controller/deleteDiagram.js";
import retrievePlantUMLCode from "../controller/retrievePlantUMLCode.js";
import retrievePNGDiagram from "../controller/retrievePNGDiagram.js";
import retrieveSVGDiagram from "../controller/retrieveSVGDiagram.js";
import { Router } from "express";

const diagramRouter = Router();

diagramRouter.get("/retrieve-png-diagram/:diagramId", retrievePNGDiagram);
diagramRouter.get("/retrieve-plantuml-code/:diagramId", retrievePlantUMLCode);
diagramRouter.get("/retrieve-svg-diagram/:diagramId", retrieveSVGDiagram);
diagramRouter.post("/delete-diagram", deleteDiagram);

export default diagramRouter;
