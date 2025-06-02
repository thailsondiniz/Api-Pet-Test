// import app from './src/index.js';
//importar mongoose
// import mongoose from 'mongoose';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const petRoutes = require('./src/routes/petRoutes');
const app = express();
app.use(express.json());
app.use(cors()); 
const port = process.env.PORT || 3000;

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`);
})
