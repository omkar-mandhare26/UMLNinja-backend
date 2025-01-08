import { Router } from "express";

const router = Router();

router.post("/signup");

router.post("/login");

router.put("/reset-password");

router.get("/view-profile");

router.get("/get-users");

router.get("/get-users/:userId");

router.delete("/delete-user/:userId");

router.get("/deactivate-user/:userId");

// No of users, creds used etc
router.get("/view-stats");

export default router;
