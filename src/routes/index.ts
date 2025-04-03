import conversationRouter from "./conversationRoutes.js";
import diagramRouter from "./diagramRoutes.js";
import userRouter from "./userRoutes.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/diagram", diagramRouter);
router.use("/conversation", conversationRouter);

export default router;
