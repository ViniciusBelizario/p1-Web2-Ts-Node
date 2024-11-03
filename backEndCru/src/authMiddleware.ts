import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user'; // Ajuste o caminho conforme sua estrutura de pastas

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'mysecretkey'; // Valor do JWT_SECRET definido no .env

// Rota de Login
router.get('/user/:email', async (req: Request, res: Response) => {
  const { email } = req.params;
  const { password } = req.query; // Recebendo a senha via query params

  if (!password) {
    return res.status(400).json({ message: 'A senha não foi fornecida.' });
  }

  try {
    // Busca o usuário no banco de dados
    const user = await User.findOne({ where: { u_email: email } });

    if (!user) {
      return res.status(404).json({ message: `Usuário com o email "${email}" não encontrado.` });
    }

    // Usa bcrypt para comparar a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password as string, user.u_password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Se a senha estiver correta, gera um token JWT
    const token = jwt.sign({ email: user.u_email, id: user.u_id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    // Retorna o token e os dados do usuário (exceto a senha)
    const { u_password, ...userWithoutPassword } = user.get({ plain: true });
    return res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o usuário', error });
  }
});

export default router;
