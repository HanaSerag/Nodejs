// router/usersRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/auth/getallusers"); 
    res.json(response.data); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching from Auth-Server" });
  }
});

module.exports = router;
