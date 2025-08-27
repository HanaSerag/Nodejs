const userData = require('../data/users');
const tokenData = require('../data/tokens');

const deleteUser = async (req, res) => {
    const username = req.params.username; // من الـ params مش الـ body
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    const checkToken = await tokenData.findOne({ username: username });
    if (!checkToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await userData.deleteOne({ username: username });
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.render('users', { message: 'User deleted successfully' });
};

module.exports = deleteUser;
