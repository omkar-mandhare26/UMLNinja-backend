import conversationRouter from "./conversationRoutes.js";
import diagramRouter from "./diagramRoutes.js";
import projectRouter from "./projectRoutes.js";
import creditRouter from "./creditRoutes.js";
import userRouter from "./userRoutes.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/credit", creditRouter);
router.use("/conversation", conversationRouter);
router.use("/diagram", diagramRouter);

export default router;
