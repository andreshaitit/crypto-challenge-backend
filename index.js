const express = require('express');
const app = express();
const cors = require('cors');
const { AppDataSource } = require('./src/config/data-source');
const usersRouter = require('./src/routes/users');
const cryptosRouter = require('./src/routes/cryptos');
const authMiddleware = require('./src/middleware/auth');
const authRouter = require('./src/routes/auth'); // Importa la ruta de autenticación

// Middleware
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor Express!');
});

// Rutas protegidas
app.use('/users', authMiddleware, usersRouter);
app.use('/cryptos', authMiddleware, cryptosRouter);

// Definir el puerto
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });