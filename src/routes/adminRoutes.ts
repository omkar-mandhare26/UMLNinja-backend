import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/signup");

adminRouter.post("/login");

adminRouter.put("/reset-password");

adminRouter.get("/view-profile");

adminRouter.get("/get-users");

adminRouter.get("/get-users/:userId");

adminRouter.delete("/delete-user/:userId");

adminRouter.get("/deactivate-user/:userId");

// No of users, creds used etc
adminRouter.get("/view-stats");

export default adminRouter;
