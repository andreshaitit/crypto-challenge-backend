import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'tu_secreto_jwt') as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};

export default authMiddleware;