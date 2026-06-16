import express from "express";
import { registerAppointment, updateAppointment, getAllAppointments } from "../controllers/appointment.controller.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/register", registerAppointment);
appointmentRouter.put("/update", updateAppointment);
appointmentRouter.get("/all", getAllAppointments);

export default appointmentRouter;