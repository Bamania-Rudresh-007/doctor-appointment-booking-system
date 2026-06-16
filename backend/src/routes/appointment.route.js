import express from "express";
import { registerAppointment, updateAppointment, getAllAppointments } from "../controllers/appointment.controller.js";
import protect from "./src/middlewares/protect.middleware.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/register", protect, registerAppointment);
appointmentRouter.put("/update", protect, updateAppointment);
appointmentRouter.get("/all", protect, getAllAppointments);

export default appointmentRouter;