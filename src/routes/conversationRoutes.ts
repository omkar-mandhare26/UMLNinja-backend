import userQuery from "../controller/userQuery.js";
import auth from "../middleware/auth.js";
import { Router } from "express";

const conversationRouter = Router();
conversationRouter.post("/query", auth, userQuery);

export default conversationRouter;
