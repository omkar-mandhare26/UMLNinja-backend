import retrievePlantUMLCode from "../controller/retrievePlantUMLCode.js";
import retrievePNGDiagram from "../controller/retrievePNGDiagram.js";
import retrieveSVGDiagram from "../controller/retrieveSVGDiagram.js";
import getDiagramDetails from "../controller/getDiagramDetails.js";
import deleteDiagram from "../controller/deleteDiagram.js";
import auth from "../middleware/auth.js";
import { Router } from "express";
const diagramRouter = Router();

diagramRouter.post("/delete-diagram", auth, deleteDiagram);
diagramRouter.post("/get-diagram-details", auth, getDiagramDetails);
diagramRouter.get("/retrieve-png-diagram/:diagramId", retrievePNGDiagram);
diagramRouter.get("/retrieve-svg-diagram/:diagramId", retrieveSVGDiagram);
diagramRouter.get("/retrieve-plantuml-code/:diagramId", retrievePlantUMLCode);

export default diagramRouter;
