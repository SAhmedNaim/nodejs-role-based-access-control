const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/register', userController.register);
router.get("/users", userController.getUsers);
router.get('/users/:userId', userController.getUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
