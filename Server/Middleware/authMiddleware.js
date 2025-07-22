import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; // Fixed here, use .header() for Authorization
        if (!token) {
            return res.status(404).json({ success: false, error: "Token not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY); // Assuming JWT_KEY is set in .env
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Invalid token" });
        }

        const user = await User.findById({ _id: decoded._id }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next(); // Continue with the next middleware or route handler
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" });
    }
}

export default verifyUser;
