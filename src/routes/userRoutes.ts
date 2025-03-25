import { Router } from "express";
import userLogout from "../controller/userLogout.js";
import userSignup from "../controller/userSignup.js";
import verifyOTP from "../controller/verifyOTP.js";
import userLogin from "../controller/userLogin.js";
import sendOTP from "../controller/sendOTP.js";
import auth from "../middleware/auth.js";
import me from "../controller/me.js";
import getMyPlan from "../controller/getMyPlan.js";
import getAllDiagrams from "../controller/getAllDiagrams.js";

const userRouter = Router();

userRouter.post("/send-otp", sendOTP);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.post("/get-my-plan", getMyPlan);
userRouter.post("/get-all-diagrams", getAllDiagrams);
userRouter.post("/me", auth, me);

export default userRouter;
