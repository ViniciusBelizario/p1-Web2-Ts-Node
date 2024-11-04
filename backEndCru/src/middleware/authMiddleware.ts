// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'mysecretkey'; // Certifique-se de que JWT_SECRET está definido no seu .env

interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado: nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    req.userId = decoded.id; // Define o userId no objeto req
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};
