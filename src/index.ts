import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import usersRouter from './routes/users';
import cryptosRouter from './routes/cryptos';
import authMiddleware from './middleware/auth';
import authRouter from './routes/auth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/auth', authRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde el servidor Express!');
});

// Rutas protegidas
app.use('/users', authMiddleware, usersRouter);
app.use('/cryptos', authMiddleware, cryptosRouter);

// Definir el puerto
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
