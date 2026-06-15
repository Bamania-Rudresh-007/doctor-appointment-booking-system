import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^\+?[1-9]\d{1,14}$/,
                "Please provide a valid phone number",
            ],
        },
        appointmentDate: {
            type: String,
            required: [true, "Appointment date is required"],
        },
        appointmentTime: {
            type: String,
            required: [true, "Appointment time is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: {
                values: ["regular", "premium", "emergency"],
                message: "{VALUE} is not a valid category",
            },
            lowercase: true,
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            trim: true,
        },
        fee: {
            type: Number,
            required: [true, "Fee amount is required"],
            min: [0, "Fee cannot be negative"],
        },
        symptoms: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
            default: "Pending",
        },
        feePaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        bookedDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        collection: "appointments",
        timestamps: true,
    },
);

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment;