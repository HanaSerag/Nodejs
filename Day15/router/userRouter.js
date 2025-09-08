const express = require('express');
const { getAllUsers, getUserById, addUser, editUser, deleteUser } = require('../controllers/userController');
const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.get('/all-users', checkAuth, getAllUsers);
router.get('/:id', checkAuth, getUserById);
router.post('/add-user', checkAuth, addUser);
router.put('/edit-user/:id', checkAuth, editUser);
router.delete('/delete-user/:id', checkAuth, deleteUser);

module.exports = router;
