const express = require('express');
const { getCharacters } = require('../controller/charController');
const router = express.Router();

// Ruta para obtener personajes
router.get('/characters', getCharacters);

module.exports = router;
