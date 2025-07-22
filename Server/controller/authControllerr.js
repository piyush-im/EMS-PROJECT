import dotenv from 'dotenv';
dotenv.config();  
import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: false, error: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: false, error: "Password is incorrect" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY, 
            { expiresIn: "10d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: false, error: "Something went wrong" });
    }
};

const verify = (req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}

export { login, verify };
