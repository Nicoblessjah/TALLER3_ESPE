// backend/routes/characterRoutes.js
const express = require('express');
const { getCharacters } = require('../controller/charController');
const router = express.Router();

router.get('/characters', getCharacters);

module.exports = router;
