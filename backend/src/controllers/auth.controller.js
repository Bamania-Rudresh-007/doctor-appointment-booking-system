import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";


// 1. LOGIN CONTROLLER

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await Admin.findOne({ email }).select("+password +refreshToken");

        if (!existingUser) {
            return res.status(401).json({ success: false, message: "The User is not Authenticated Access Denied" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const accessToken = jwt.sign(
            { id: existingUser._id, name: existingUser.name, email },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: existingUser._id, name: existingUser.name, email },
            process.env.REFRESH_TOKEN,
            { expiresIn: "7d" }
        );

        // Safely push plain token strings directly into the array
        existingUser.refreshToken.push(refreshToken);
        await existingUser.save();

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({
                success: true,
                message: "Login successful",
                data: { accessToken },
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// 2. REFRESH TOKEN ROTATION CONTROLLER

const refreshAccessToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) {
            return res.status(401).json({ success: false, message: "No refresh token provided" });
        }
        
        const incomingRefreshToken = cookies.refreshToken;

        // Querying a plain array element is clean and fast in Mongoose
        const existingUser = await Admin.findOne({ refreshToken: incomingRefreshToken }).select("+refreshToken");

        // --- REUSE DETECTION LOGIC ---
        if (!existingUser) {
            try {
                // If token is missing from DB but valid, it was already used by an attacker
                const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN);
                
                // Clear out everything to protect the account
                await Admin.findByIdAndUpdate(decoded.id, { $set: { refreshToken: [] } });
                
                return res.status(403).json({
                    success: false,
                    message: "Compromised token detected. All sessions invalidated. Please log in again."
                });
            } catch (err) {
                return res.status(403).json({ success: false, message: "Invalid or expired session" });
            }
        }

        // Verify validity of the token signature
        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN);
        } catch (err) {
            // Expired token removal
            existingUser.refreshToken = existingUser.refreshToken.filter(t => t !== incomingRefreshToken);
            await existingUser.save();
            return res.status(403).json({ success: false, message: "Session expired. Please log in again." });
        }

        // Generate brand new token pair
        const newAccessToken = jwt.sign(
            { id: existingUser._id, name: existingUser.name, email: existingUser.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { id: existingUser._id, name: existingUser.name, email: existingUser.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: "7d" }
        );

        // Filter out used token and swap with the rotated version
        existingUser.refreshToken = existingUser.refreshToken.filter(t => t !== incomingRefreshToken);
        existingUser.refreshToken.push(newRefreshToken);
        await existingUser.save();

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        return res.status(200)
            .cookie('refreshToken', newRefreshToken, cookieOptions)
            .json({
                success: true,
                message: "Token rotated successfully",
                data: { accessToken: newAccessToken }
            });

    } catch (err) {
        console.error("Refresh Token Error: ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// 3. LOGOUT CONTROLLER

const logout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) {
            return res.sendStatus(204); 
        }

        const incomingRefreshToken = cookies.refreshToken;

        const existingUser = await Admin.findOne({ refreshToken: incomingRefreshToken }).select("+refreshToken");

        if (existingUser) {
            // Remove exactly one active session token string from DB array
            existingUser.refreshToken = existingUser.refreshToken.filter(
                (token) => token !== incomingRefreshToken
            );
            await existingUser.save();
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        };

        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (err) {
        console.error("Logout Error: ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// AdminRegistration Controller

const registerAdmin = async (req, res) => {
    try{
        const {name , email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        const emailExists = await Admin.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "An admin account with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await Admin.create({
            name,
            email,
            password: hashedPassword,
        })

        const userResponse = newUser.toObject();
        delete userResponse.password;

        
        return res.status(201).json({
            success: true,
            message: "New Admin created successfully", 
            data: {
                user: userResponse,
            }
        })


    }   
    catch(err){
        console.error("Registration Error: ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export {login, refreshAccessToken, logout, registerAdmin};