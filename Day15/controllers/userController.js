const { usersData } = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const users = await usersData.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await usersData.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addUser = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
    try {
        const newUser = new usersData(req.body);
        await newUser.save();
        res.status(201).json({ message: "User added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const editUser = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
    try {
        const updatedUser = await usersData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "User updated", updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteUser = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
    try {
        await usersData.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllUsers, getUserById, addUser, editUser, deleteUser };
