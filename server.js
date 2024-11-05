import app from './src/index.js';
const PORT = 3000;

//importar mongoose
import mongoose from 'mongoose';
//conectar ao mongoDb usando a URL do mongoDB Compass
const mongoURI = 'mongodb://localhost:27017/dbPetsTest';

mongoose.connect(mongoURI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})
