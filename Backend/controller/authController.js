const { readData, writeData } = require('../utils/fileHelper');
const usersFilePath = './data/users.json';

const register = async (req, res) => {
    const { username, password } = req.body;

    const users = await readData(usersFilePath);

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = { username, password };
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

    res.json({ message: 'Login exitoso' });
};

module.exports = { register, login };
