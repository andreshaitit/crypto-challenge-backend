import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { Users } from '../entities/users';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

interface UserRequestBody {
  username: string;
  password: string;
}

// Middleware para manejar validaciones
const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// Obtener todos los usuarios
router.get('/', async (req: Request, res: Response): Promise<void> => {
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
  validateRequest,
  async (req: Request<{}, {}, UserRequestBody>, res: Response): Promise<void> => {
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
router.put('/:id', async (req: Request<{ id: string }, {}, UserRequestBody>, res: Response): Promise<void> => {
  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const user = await usersRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    usersRepository.merge(user, req.body);
    const result = await usersRepository.save(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const result = await usersRepository.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

export default router;