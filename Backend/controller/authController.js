const { readData, writeData } = require('../utils/fileHelper');
const usersFilePath = './data/users.json';
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Reemplaza con una clave secreta segura

const register = async (req, res) => {
    const { username, password } = req.body;

    const users = await readData(usersFilePath);

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = {
        username,
        password,
        winner: 0,
        loser: 0
    };

    users.push(newUser);
    await writeData(usersFilePath, users);

    res.status(201).json({ message: 'Usuario registrado con éxito' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const users = await readData(usersFilePath);

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
};

const getUsers = async (req, res) => {
    try {
        const users = await readData(usersFilePath);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

module.exports = { register, login, getUsers };
