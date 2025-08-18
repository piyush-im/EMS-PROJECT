import User from "../Models/User.js";
import bcrypt from "bcryptjs";

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Old password is incorrect" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashPassword });

    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Settings error" });
  }
};

export { changePassword };
