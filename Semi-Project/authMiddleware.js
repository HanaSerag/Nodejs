const SessionData = require('./Models/Session');

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const session = await SessionData.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized: Invalid session" });
    }

    req.user = { username: session.username, role: session.role };
    next();
  } catch (err) {
    console.error("AuthMiddleware error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = isAuthenticated;
