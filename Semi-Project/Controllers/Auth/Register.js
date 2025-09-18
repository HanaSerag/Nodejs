const bcrypt = require('bcrypt');
const User = require('../../Models/User');

exports.Register = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    //const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });

    await newUser.save();

    res.status(201).json({ ok: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
