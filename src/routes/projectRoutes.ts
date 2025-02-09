import { Router } from "express";
import auth from "../middleware/auth.js";

const projectRouter = Router();

projectRouter.use(auth);

projectRouter.get("/create-project");
projectRouter.get("/get-all-projects");
projectRouter.post("/retrieve-project-details");
projectRouter.put("/update-project");
projectRouter.delete("/delete-project");

export default projectRouter;
