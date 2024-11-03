import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import { seedUsers, seedGames } from './seedData';
import gameRoutes from './routes/gameRoutes';

const app = express();
const port = process.env.PORT || 5000;

// Habilita o CORS para todas as rotas e origens específicas
app.use(cors({
  origin: 'http://localhost:5173',  // Permita apenas o frontend
}));

app.use(express.json());

// Rotas
app.use('/api', userRoutes);

app.use('/api', gameRoutes);

// Sincroniza o banco de dados e insere os dados iniciais
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Banco de dados sincronizado e tabela criada ou alterada.');
    await seedUsers();
    await seedGames();
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
