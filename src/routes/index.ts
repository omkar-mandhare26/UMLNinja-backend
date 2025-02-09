import conversationRouter from "./conversationRoutes.js";
import diagramRouter from "./diagramRoutes.js";
import projectRouter from "./projectRoutes.js";
import creditRouter from "./creditRoutes.js";
import userRouter from "./userRoutes.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/projects", projectRouter);
router.use("/credits", creditRouter);
router.use("/conversations", conversationRouter);
router.use("/diagrams", diagramRouter);

export default router;
