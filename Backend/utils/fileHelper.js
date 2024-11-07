const fs = require('fs').promises;

const readData = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

const writeData = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };