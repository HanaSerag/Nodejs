const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../Models/User");
const SessionData = require("../../Models/Session");

exports.LoginStart = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    if (user.otp && user.otpExpiry > Date.now()) {
      return res.status(400).json({ message: "OTP already sent, please verify" });
    }

     const otpCode = Math.floor(100000 + Math.random() * 900000);

    user.otp = otpCode;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    res.status(200).json({
      message: "OTP sent successfully (demo)",
      otpCode, // in real life send mail or sms
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("LoginStart error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.LoginVerify = async (req, res) => {
  try {
    const { username, otpCode } = req.body;

    if (!username || !otpCode) {
      return res.status(400).json({ message: "Missing username or otpCode" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(401).json({ message: "No active OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(401).json({ message: "OTP expired" });
    }

    if (user.otp.toString() !== otpCode.toString().trim()) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const sessionToken = crypto.randomBytes(32).toString("hex");
    const newSession = new SessionData({
      username: user.username,
      token: sessionToken,
      role: user.role || "user",
    });
    await newSession.save();

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
      token: sessionToken,
    });
  } catch (err) {
    console.error("LoginVerify error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
