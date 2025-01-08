import { Router } from "express";
import userQuery from "../controller/userQuery.js";
import userSignup from "../controller/userSignup.js";
import sendOTP from "../controller/sendOTP.js";
import verifyOTP from "../controller/verifyOTP.js";
import userLogin from "../controller/userLogin.js";

const router = Router();

router.post("/signup", userSignup);

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

router.post("/login", userLogin);

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

router.post("/project-conversations");

export default router;
