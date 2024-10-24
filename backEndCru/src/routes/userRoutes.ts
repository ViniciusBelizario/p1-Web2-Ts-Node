import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/user'; // Importa o modelo User

const router = express.Router();

// Rota para buscar usuário pelo email e verificar senha
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

    // Se a senha estiver correta, retorna o usuário (exceto a senha)
    const { u_password, ...userWithoutPassword } = user.get({ plain: true });
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o usuário', error });
  }
});

// Rota para criar um novo usuário
router.post(
  '/create-user',
  [
    body('name').notEmpty().withMessage('O nome é obrigatório'),
    body('surname').notEmpty().withMessage('O sobrenome é obrigatório'),
    body('email').isEmail().withMessage('O e-mail deve ser válido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('As senhas não coincidem');
      }
      return true;
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password } = req.body;

    try {
      // Verifica se o e-mail já está em uso
      const existingUser = await User.findOne({ where: { u_email: email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Este e-mail já está em uso.' });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o novo usuário no banco de dados usando Sequelize
      const newUser = await User.create({
        u_nome: name,
        u_email: email,
        u_password: hashedPassword,
        u_accessLevel: 1, // Define um nível de acesso padrão (ajuste conforme necessário)
      });

      return res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
      return res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
  }
);

export default router;
