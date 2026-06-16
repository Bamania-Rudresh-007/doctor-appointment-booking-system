import Appointment from "../models/appointment.model.js"; // Verified typo fix

const registerAppointment = async (req, res) => {
    try {
        const incomingAppointment = req.body; 

        if (!incomingAppointment) {
            return res.status(400).json({ success: false, message: "Appointment data is required" });
        }

        const processAppointment = {
            name: incomingAppointment.fullName,
            phoneNumber: incomingAppointment.phoneNumber,
            appointmentDate: incomingAppointment.date,
            appointmentTime: incomingAppointment.time,
            category: incomingAppointment.category,
            paymentMethod: incomingAppointment.paymentMethod,
            fee: incomingAppointment.category?.toLowerCase() === "regular" ? 500 : 1000, 
            symptoms: incomingAppointment.notes,
        };

        const newAppointment = await Appointment.create(processAppointment);

        return res.status(201).json({
            success: true,
            message: "Appointment created Successfully",
            data: {
                appointment: newAppointment,
            }
        });
    } catch (err) {
        console.error("Error registering appointment: ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateAppointment = async (req, res) => {
    try {
        console.log("Request Body:" ,req.body)
        const { _id, changes } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            _id, 
            changes,
            { returnDocument: "after", runValidators: true } 
        );

        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: {
                appointment: updatedAppointment 
            }
        });

    } catch (err) {
        console.error("Error Updating appointment: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export { registerAppointment, updateAppointment };