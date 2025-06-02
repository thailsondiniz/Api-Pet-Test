const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

// Requisição da lista de pets
router.get('/', async (req, res) => {
  try {
    const limite = parseInt(req.query.limit) || 0;
    const pets = await Pet.find().limit(limite);
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send('Erro ao buscar os pets');
  }
});

// Requisição por ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).send('Pet não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar o pet');
  }
});

// Criar novo pet
router.post('/', async (req, res) => {
  try {
    const novoPet = new Pet(req.body);
    await novoPet.save();
    res.status(201).send('Pet cadastrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar o pet');
  }
});

// Atualizar pet
router.put('/:id', async (req, res) => {
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

// Deletar pet
router.delete('/:id', async (req, res) => {
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

module.exports = router;
