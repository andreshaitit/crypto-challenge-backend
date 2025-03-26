const express = require('express');
const router = express.Router();
const { AppDataSource } = require('../config/data-source');
const { Cryptos } = require('../entities/cryptos');

// Obtener todas las criptomonedas
router.get('/', async (req, res) => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const cryptos = await cryptosRepository.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener criptomonedas', error });
  }
});

// Crear una nueva criptomoneda
router.post('/', async (req, res) => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const newCrypto = cryptosRepository.create(req.body);
    const result = await cryptosRepository.save(newCrypto);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear criptomoneda', error });
  }
});

// Actualizar una criptomoneda
router.put('/:id', async (req, res) => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const crypto = await cryptosRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!crypto) {
      return res.status(404).json({ message: 'Criptomoneda no encontrada' });
    }
    cryptosRepository.merge(crypto, req.body);
    const result = await cryptosRepository.save(crypto);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar criptomoneda', error });
  }
});

// Eliminar una criptomoneda
router.delete('/:id', async (req, res) => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const result = await cryptosRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar criptomoneda', error });
  }
});

module.exports = router;