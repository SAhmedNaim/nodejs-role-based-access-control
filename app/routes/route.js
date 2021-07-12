const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get("/users", userController.allowIfLoggedin, userController.getUsers);
router.get("/users/:userId", userController.allowIfLoggedin, userController.getUser);
router.put('/users/:userId', userController.allowIfLoggedin, userController.updateUser);
router.delete('/users/:userId', userController.allowIfLoggedin, userController.deleteUser);

module.exports = router;
