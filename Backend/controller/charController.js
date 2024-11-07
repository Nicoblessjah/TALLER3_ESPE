// backend/controllers/characterController.js
const { readData } = require('../utils/fileHelper');
const charactersFilePath = './data/characters.json';

const getCharacters = async (req, res) => {
    try {
        const characters = await readData(charactersFilePath);
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los personajes" });
    }
};

module.exports = { getCharacters };
