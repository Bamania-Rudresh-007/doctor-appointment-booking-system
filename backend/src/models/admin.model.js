import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        refreshToken: {
            type: [String],
            select: false,
            default: []
        },
    },
    {
        collection: "adminUsers",
        timestamps: true,
    },
);

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
