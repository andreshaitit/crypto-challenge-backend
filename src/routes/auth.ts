import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { Users } from '../entities/users';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Interfaz para el cuerpo de la solicitud de login
interface LoginRequestBody {
  username: string;
  password: string;
}

// Ruta para iniciar sesión
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const user = await usersRepository.findOneBy({ username });

    if (!user) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    if (typeof user.password !== 'string') {
      res.status(500).json({ message: 'Error inesperado: contraseña inválida' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para registrar un nuevo usuario
router.post(
  '/register',
  [
    body('username').isString().notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').isString().notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
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

export default router;