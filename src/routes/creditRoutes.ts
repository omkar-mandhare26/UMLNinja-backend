import { Router } from "express";
import auth from "../middleware/auth.js";

const creditRouter = Router();

creditRouter.use(auth);

creditRouter.get("/credits-remaining");

export default creditRouter;
