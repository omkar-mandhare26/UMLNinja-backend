import getAllDiagrams from "../controller/getAllDiagrams.js";
import requestCredits from "../controller/requestCredit.js";
import viewProfile from "../controller/viewProfile.js";
import userLogout from "../controller/userLogout.js";
import userSignup from "../controller/userSignup.js";
import verifyOTP from "../controller/verifyOTP.js";
import userLogin from "../controller/userLogin.js";
import getMyPlan from "../controller/getMyPlan.js";
import contactUs from "../controller/contactUs.js";
import sendOTP from "../controller/sendOTP.js";
import auth from "../middleware/auth.js";
import me from "../controller/me.js";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/me", auth, me);
userRouter.post("/login", userLogin);
userRouter.post("/send-otp", sendOTP);
userRouter.post("/signup", userSignup);
userRouter.post("/logout", userLogout);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/contact-us", contactUs);
userRouter.post("/get-my-plan", auth, getMyPlan);
userRouter.post("/view-profile", auth, viewProfile);
userRouter.post("/request-credits", auth, requestCredits);
userRouter.post("/get-all-diagrams", auth, getAllDiagrams);

export default userRouter;
