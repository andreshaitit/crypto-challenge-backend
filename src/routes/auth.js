const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AppDataSource } = require('../config/data-source');
const { Users } = require('../entities/users');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const user = await usersRepository.findOneBy({ username });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'tu_secreto_jwt', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para crear un nuevo usuario
router.post(
  '/register',
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

module.exports = router;