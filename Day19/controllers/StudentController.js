const { studentsData } = require('../models/students');

const addStudent = async (req, res) => {
    try {
        const student = new studentsData(req.body);
        await student.save();
        return res.status(201).json(student);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await studentsData.find();
        return res.json(students);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await studentsData.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        return res.json(student);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const student = await studentsData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: "Student not found" });
        return res.json(student);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await studentsData.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        return res.json({ message: "Student deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent};
