import express from 'express';
import Game from '../models/modelgames';

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

// Rota para cadastrar um novo jogo
router.post('/games', async (req, res) => {
  const { g_title, g_description, g_genre, g_price, g_releaseDate, g_platform } = req.body;

  try {
    const newGame = await Game.create({
      g_title,
      g_description,
      g_genre,
      g_price,
      g_releaseDate,
      g_platform,
    });

    res.status(201).json(newGame);
  } catch (error) {
    console.error('Erro ao cadastrar o jogo:', error);
    res.status(500).json({ error: 'Erro ao cadastrar o jogo' });
  }
});

export default router;
