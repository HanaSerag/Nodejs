const { usersData } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await usersData.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usersData({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const login = async(req,res) => {
    try {
        const {usernameOrEmail, password} = req.body;
        if (!usernameOrEmail || !password){
            return res.status(400).json({message : "All inputs are required"})
        }

        const getUser = await usersData.findOne({$or : [{email : usernameOrEmail}, {username : usernameOrEmail}]});
        if (!getUser){
            return res.status(400).json({message : "Invalid username or email"});
        }

        const comparePassword = await bcrypt.compare(password, getUser.password);
        if (!comparePassword){
            return res.status(400).json({message : "Invalid password"});
        }

        const token = jwt.sign(
            {firstName : getUser.firstName, lastName :getUser.lastName, email: getUser.email, role : getUser.role},  
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        req.session.token = token;
        return res.json({message : 'Login successful', token});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message : "Server error"});
    }
}

module.exports = { register, login }
