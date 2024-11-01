//importar express
import express from 'express';
//instanciar express
const app = express();

//indicar para o express ler o body com json
app.use(express.json())

//mock
const pets = [
    {
        id:1,
        especie: 'Cachorro',
        nome: 'Spike',
        raca: 'Labrador Retriever',
        idade: '2 Anos',
        sexo: 'Macho',
        decricao: 'Muito brincalhão',
        imagens: 'sem imagem'
    },
    {
        id:2,
        especie: 'Cachorro',
        nome: 'Bella',
        raca: 'Shih Tzu',
        idade: '3 Meses',
        sexo: 'Fêmea',
        decricao: 'Muito dócil',
        imagens: 'sem imagem'
    },
    {
        id:3,
        especie: 'Gato',
        nome: 'Bella',
        raca: 'Siamês',
        idade: '6 Meses',
        sexo: 'Fêmea',
        decricao: 'Muito carinhosa',
        imagens: 'sem imagem'
    },
]
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
app.get('/pets', (req, res)=>{
    res.status(200).send(pets);
})

//requisição por Id
app.get('/pets/:id', (req, res) =>{
     res.json(buscarPetPorId(req.params.id))
})

//Postar anuncio
app.post('/pets', (req, res)=>{
    pets.push(req.body)
    res.status(201).send('Pet cadastrado com sucesso!');
})

//deletar pet
app.delete('/pets/:id', (req, res)=>{
    let index = buscarIndexPet(req.params.id);
    pets.splice(index, 1)
    res.send(`Pet com id ${req.params.id} excluido com sucesso`);
})

//atualizar pet
app.put('/pets/:id', (req, res)=>{
    let index = buscarIndexPet(req.params.id);
    pets[index].nome = req.body.nome
    pets[index].idade = req.body.idade
    pets[index].raca = req.body.raca
    pets[index].sexo = req.body.sexo
    pets[index].decricao = req.body.decricao
    res.json(pets);
})

export default app; 
