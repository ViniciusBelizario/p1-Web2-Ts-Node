import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port: number = 5000;

// Definição de tipos para o usuário
interface User {
  email: string;
  password: string;
}

// Usuário pré-cadastrado no sistema
const registeredUser: User = {
  email: 'admin@admin.com',
  password: 'admin123' // Não é recomendado enviar senhas em texto puro em produção
};

// Middleware para permitir requests entre front-end e back-end (CORS)
app.use(cors({
  origin: 'http://localhost:5173' // Substitua pela porta onde seu front-end está rodando
}));

// Endpoint para obter o usuário cadastrado
app.get('/api/user', (req: Request, res: Response) => {
    console.log('Requisição recebida para /api/user');
    res.json(registeredUser);
  });

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
