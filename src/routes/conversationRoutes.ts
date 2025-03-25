import { Router } from "express";
import auth from "../middleware/auth.js";
import userQuery from "../controller/userQuery.js";

const conversationRouter = Router();

conversationRouter.post("/me", (req, res) => {
    res.json({ msg: "me" });
});

// conversationRouter.use(auth);

conversationRouter.post("/query", userQuery);
conversationRouter.get("/project-conversations");

export default conversationRouter;
