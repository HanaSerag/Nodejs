const express = require('express');
const { getAllStudents, getStudentById, addStudent, editStudent, deleteStudent } = require('../controllers/studentController');
const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

// Public
router.get('/all-student', getAllStudents);
router.get('/:id', getStudentById);

// Protected
router.post('/add-student', checkAuth, addStudent);
router.put('/edit-student/:id', checkAuth, editStudent);
router.delete('/delete-student/:id', checkAuth, deleteStudent);

module.exports = router;
