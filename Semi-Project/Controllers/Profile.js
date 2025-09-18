const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.GetProfile = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: 'Username required' });

    const user = await User.findOne({ username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong old password' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.ChangeLSName = async (req, res) => {
  try {
    const { username, firstName, lastName } = req.body;

    const user = await User.findOneAndUpdate(
      { username },
      { firstName, lastName },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.EnableOtp = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

  
    res.status(200).json({ message: 'OTP Enabled (demo)' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
