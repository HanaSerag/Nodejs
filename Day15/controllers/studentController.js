const { Student } = require('../models/student');


const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addStudent = async (req, res) => {
    try {
        const { name, age, grade } = req.body;
        const newStudent = new Student({ name, age, grade });
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const editStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student updated", updatedStudent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllStudents, getStudentById, addStudent, editStudent, deleteStudent };
