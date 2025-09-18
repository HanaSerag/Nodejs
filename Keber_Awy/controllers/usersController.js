const userData = require('../data/users');
const tokenData = require('../data/tokens');

const users = async (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    const checkToken = await tokenData.findOne({ username: username });
    if (!checkToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const allUsers = await userData.find();
    const userInfo = allUsers.map(user => ({
        email: user.email,
        username: user.username,
        fullName: `${user.firstname} ${user.lastname}`
    }));
    return res.render('users', { users: userInfo });
};

module.exports = users ;
