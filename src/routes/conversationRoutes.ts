import { Router } from "express";
import auth from "../middleware/auth.js";
import userQuery from "../controller/userQuery.js";

const conversationRouter = Router();

conversationRouter.use(auth);

conversationRouter.post("/query", userQuery);
conversationRouter.post("/project-conversations");

export default conversationRouter;
