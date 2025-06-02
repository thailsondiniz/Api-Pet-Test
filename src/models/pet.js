const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    especie: String,
    nome: String,
    raca: String,
    idade: String,
    sexo: String,
    descricao: String,
    imagens: [String]
  },
  { collection: "petsLista" }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
