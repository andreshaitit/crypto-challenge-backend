import express, { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Cryptos } from '../entities/cryptos';

const router = express.Router();

// Obtener todas las criptomonedas
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const cryptos = await cryptosRepository.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener criptomonedas', error });
  }
});

// Crear una nueva criptomoneda
router.post('/', async (req: Request, res: Response): Promise<void> => {
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
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const crypto = await cryptosRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!crypto) {
      res.status(404).json({ message: 'Criptomoneda no encontrada' });
      return;
    }
    cryptosRepository.merge(crypto, req.body);
    const result = await cryptosRepository.save(crypto);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar criptomoneda', error });
  }
});

// Eliminar una criptomoneda
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const cryptosRepository = AppDataSource.getRepository(Cryptos);
    const result = await cryptosRepository.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar criptomoneda', error });
  }
});

export default router;