//importar express
import express from 'express';
import Pet from './models/pet.js';

//instanciar express
const app = express();

//indicar para o express ler o body com json
app.use(express.json())

// //mock
// const pets = [
//     {
//         id:1,
//         especie: 'Cachorro',
//         nome: 'Spike',
//         raca: 'Labrador Retriever',
//         idade: '2 Anos',
//         sexo: 'Macho',
//         decricao: 'Muito brincalhão',
//         imagens: 'sem imagem'
//     },
//     {
//         id:2,
//         especie: 'Cachorro',
//         nome: 'Bella',
//         raca: 'Shih Tzu',
//         idade: '3 Meses',
//         sexo: 'Fêmea',
//         decricao: 'Muito dócil',
//         imagens: 'sem imagem'
//     },
//     {
//         id:3,
//         especie: 'Gato',
//         nome: 'Bella',
//         raca: 'Siamês',
//         idade: '6 Meses',
//         sexo: 'Fêmea',
//         decricao: 'Muito carinhosa',
//         imagens: 'sem imagem'
//     },
// ]
//buscar pet por id
function buscarPetPorId(id){
    return pets.filter((pet)=> pet.id == id);
}

//pegar a posição ou index do elemento no array por id
function buscarIndexPet(id){
    return pets.findIndex((pet)=>pet.id == id);
}


//Url Base
app.get('/', (req, res)=>{
    res.send('Olá Pessoas');
})

//Requisição da lista de pets
app.get('/pets', async (req, res)=>{
    try{
        const pets = await Pet.find();
        res.status(200).send(pets);
    } catch (error){
        res.status(500).send('Erro ao buscar os pets');
    }
})

//requisição por Id
app.get('/pets/:id', async (req, res) =>{
     try{
        const pet = await Pet.findById(req.params.id);
        if(pet){
            res.json(pet);
        }else{
            res.status(404).send('Pet não encontrado');
        }
     }catch (error){
        res.status(500).send('Eroo ao buscar o pet');
     }
});

//Postar anuncio
app.post('/pets', async (req, res) => {
    try {
        const novoPet = new Pet(req.body);
        await novoPet.save();
        res.status(201).send('Pet cadastrado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar o pet');
    }
});

//deletar pet
app.delete('/pets/:id', async (req, res) => {
    try {
        const petExcluido = await Pet.findByIdAndDelete(req.params.id);
        if (petExcluido) {
            res.send(`Pet com id ${req.params.id} excluído com sucesso`);
        } else {
            res.status(404).send('Pet não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao excluir o pet');
    }
});
//atualizar pet
app.put('/pets/:id', async (req, res) => {
    try {
        const petAtualizado = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (petAtualizado) {
            res.json(petAtualizado);
        } else {
            res.status(404).send('Pet não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao atualizar o pet');
    }
});

export default app; 
