const express = require('express');
const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}= require('../controllers/StudentController');

const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.post('/', checkAuth, addStudent);
router.get('/', checkAuth, getAllStudents);
router.get('/:id', checkAuth, getStudentById);
router.put('/:id', checkAuth, updateStudent);
router.delete('/:id', checkAuth, deleteStudent);

module.exports = router;
