const fs = require('fs')


const register = (req, res) => {
    return res.render('register',{message:"Please register"});
}

const registerUser = (req, res) => {
    const { username, fullname, password, role } = req.body;

    if (!username || !fullname || !password || !role) {
        return res.send("the username, fullname, password and role are required");
    }

    const user = users.find(u => u.username === username);
    if (user) { 
        res.render('register', { error: "user already exists" });
         return; 
        }
    
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    users.push({ id, username, fullname, password, role });

    fs.writeFileSync('../data/users.json', JSON.stringify(users));

    res.send("registration successful");
    res.render('index')
}
module.exports = { register, registerUser }