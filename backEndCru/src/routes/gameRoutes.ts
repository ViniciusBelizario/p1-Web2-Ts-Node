import express from 'express';
import Game from '../models/modelgames'; // Importe o modelo Game

const router = express.Router();

// Rota para listar todos os jogos
router.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll(); // Busca todos os jogos cadastrados
    res.json(games); // Retorna os jogos em formato JSON
  } catch (error) {
    console.error('Erro ao buscar os jogos:', error);
    res.status(500).json({ error: 'Erro ao buscar os jogos' });
  }
});


export default router;
