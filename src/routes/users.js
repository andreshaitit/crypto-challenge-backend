const express = require('express');
const router = express.Router();
const { AppDataSource } = require('../config/data-source');
const { Users } = require('../entities/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const users = await usersRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Crear un nuevo usuario con validaciones
router.post(
  '/',
  [
    body('username').isString().notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').isString().notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const usersRepository = AppDataSource.getRepository(Users);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = usersRepository.create({ ...req.body, password: hashedPassword });
      const result = await usersRepository.save(newUser);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear usuario', error });
    }
  }
);

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const user = await usersRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usersRepository.merge(user, req.body);
    const result = await usersRepository.save(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const result = await usersRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

module.exports = router;