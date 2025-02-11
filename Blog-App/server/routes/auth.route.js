import express from "express";
import { register, login, logout } from "../controller/auth.controller.js";
import { signUpValidation } from "../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", signUpValidation, register);
router.post("/login", login);

router.delete("/logout", logout);

export default router;