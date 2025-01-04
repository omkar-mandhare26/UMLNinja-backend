import { Router } from "express";
import { userQuery } from "../controller/userQuery.js";

const router = Router();

router.post("/signup");

router.post("/login");

router.put("/reset-password");

router.put("/update-password");

router.get("/view-profile");

router.get("/create-project");

router.get("/get-all-projects");

router.post("/retrieve-project-details");

router.get("/credits-remaining");

router.put("/update-project");

router.delete("/delete-project");

router.post("/query", userQuery);

router.get("/retrieve-diagram/:diagramId");

export default router;
