import express from "express";
import { registerAppointment, updateAppointment, getAllAppointments, getLatestAppointmentTime } from "../controllers/appointment.controller.js";
import protect from "../middlewares/protect.middleware.js"

const appointmentRouter = express.Router();

appointmentRouter.post("/register", registerAppointment);
appointmentRouter.put("/update", protect, updateAppointment);
appointmentRouter.get("/all", protect, getAllAppointments);
appointmentRouter.get("/latest", protect, getLatestAppointmentTime);

export default appointmentRouter;