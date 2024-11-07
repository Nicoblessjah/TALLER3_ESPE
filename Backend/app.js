const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/charRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', characterRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
