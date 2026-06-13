import express from "express";
import { login, refreshAccessToken, logout, registerAdmin, getAdmins } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerAdmin);
authRouter.get("/get-admins", getAdmins);
authRouter.post("/login", login);
authRouter.post("/refresh", refreshAccessToken);
authRouter.post("/logout", logout);

export default authRouter;