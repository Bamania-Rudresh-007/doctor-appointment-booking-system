import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

            req.user = await Admin.findById(decoded.id).select("-password -refreshToken").lean();

            if (!req.user) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Not authorized, user no longer exists" 
                });
            }

            return next();

        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ 
                success: false, 
                message: "Not authorized, token failed or expired" 
            });
        }
    }
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Not authorized, no token provided" 
        });
    }
};

export default protect;
