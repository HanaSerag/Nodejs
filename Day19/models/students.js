const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false }
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    email: { type: String, unique: true },
    courses: [courseSchema]
});

const studentsData = mongoose.model('students', studentSchema);
module.exports = { studentsData };
