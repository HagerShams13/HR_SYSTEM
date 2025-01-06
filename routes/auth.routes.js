import express from "express";
import register from "../controllers/authController/register.js";
import login from "../controllers/authController/login.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;