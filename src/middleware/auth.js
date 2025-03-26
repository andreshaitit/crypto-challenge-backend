const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'tu_secreto_jwt');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};

module.exports = authMiddleware;