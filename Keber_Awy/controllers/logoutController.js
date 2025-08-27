const fs = require('fs');
let users=require('../data/users.json')

const logout = (req, res) => {
    const { username } = req.params.username;

    if (!username){
        return res.send("the username is required");
    } 

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).send("User not found!");
    }

    let index = users.indexOf(user);

    users.splice(index, 1);

    fs.writeFileSync('../data/users.json', JSON.stringify(users));
    res.send("Logout successful!");
}
module.exports = { logout }