const express = require('express');
const { register, login, getUsers, updateStats } = require('../controller/authController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/update-stats', updateStats);
router.get('/users', getUsers);


module.exports = router;