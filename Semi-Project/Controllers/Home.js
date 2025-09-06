const Category = require('../Models/Category');
const Note = require('../Models/Note');

exports.Home = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(200).json({ message: 'Not authenticated' });

    const categories = await Category.find({ ownerUsername: username });
    const notes = await Note.find({ ownerUsername: username });

    res.status(200).json({
      currentUser: { username, role: 'user' },
      categories,
      notes
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
