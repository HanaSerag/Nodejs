const SessionData = require('../../Models/Session');

exports.Logout = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      await SessionData.findOneAndDelete({ token });
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
