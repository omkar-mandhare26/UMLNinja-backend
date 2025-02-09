import { Router } from "express";
import auth from "../middleware/auth.js";

const diagramRouter = Router();

diagramRouter.use(auth);

diagramRouter.get("/retrieve-diagram/:diagramId");

export default diagramRouter;
