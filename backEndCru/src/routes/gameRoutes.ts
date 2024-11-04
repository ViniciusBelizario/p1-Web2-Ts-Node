import express from 'express';
import Game from '../models/modelgames';
import { authenticateToken } from '../middleware/authMiddleware'; // Middleware para autenticação, se necessário

const router = express.Router();

// Rota para listar todos os jogos
router.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error('Erro ao buscar os jogos:', error);
    res.status(500).json({ error: 'Erro ao buscar os jogos' });
  }
});

// Rota para listar jogos cadastrados por um usuário específico
router.get('/games/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userGames = await Game.findAll({
      where: { userId },
    });

    res.json(userGames);
  } catch (error) {
    console.error(`Erro ao buscar jogos do usuário ${userId}:`, error);
    res.status(500).json({ error: `Erro ao buscar jogos do usuário ${userId}` });
  }
});

// Rota para cadastrar um novo jogo associado a um usuário específico
router.post('/games/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { g_title, g_description, g_genre, g_price, g_releaseDate, g_platform } = req.body;

  try {
    const newGame = await Game.create({
      g_title,
      g_description,
      g_genre,
      g_price,
      g_releaseDate,
      g_platform,
      userId, // Associa o jogo ao ID do usuário especificado na URL
    });

    res.status(201).json(newGame);
  } catch (error) {
    console.error('Erro ao cadastrar o jogo:', error);
    res.status(500).json({ error: 'Erro ao cadastrar o jogo' });
  }
});

export default router;
