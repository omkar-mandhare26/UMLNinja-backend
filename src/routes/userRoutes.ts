import { Router } from "express";
import userLogout from "../controller/userLogout.js";
import userSignup from "../controller/userSignup.js";
import verifyOTP from "../controller/verifyOTP.js";
import userLogin from "../controller/userLogin.js";
import sendOTP from "../controller/sendOTP.js";
import auth from "../middleware/auth.js";
import me from "../controller/me.js";

const userRouter = Router();

userRouter.post("/send-otp", sendOTP);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.post("/me", auth, me);

export default userRouter;
