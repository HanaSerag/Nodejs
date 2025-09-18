const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../Models/User");

exports.ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 دقائق
    await user.save();

    res.status(200).json({
      message: "Password reset token sent successfully",
      token,
    });
  } catch (err) {
    console.error("ForgetPassword error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { passwordResetToken } = req.query;
    const { newPassword, confirmPassword } = req.body;

    if (!passwordResetToken) {
      return res.status(400).json({ message: "Password reset token required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ passwordResetToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (!user.passwordResetTokenExpiry || user.passwordResetTokenExpiry < new Date()) {
      user.passwordResetToken = null;
      user.passwordResetTokenExpiry = null;
      await user.save();
      return res.status(400).json({ message: "Password reset token expired" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      updatedUser: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("ResetPassword error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
