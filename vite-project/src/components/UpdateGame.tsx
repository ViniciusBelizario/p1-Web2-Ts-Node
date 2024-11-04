import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/localStorageUtils';

export function UpdateGame() {
  const [game, setGame] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { gameId } = useParams(); // Obtém o ID do jogo a partir da URL

  const userId = getUserFromLocalStorage()?.id; // Obtém o ID do usuário do localStorage

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/games/${gameId}`);
        if (!response.ok) throw new Error('Erro ao buscar jogo');

        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError('Erro ao carregar os dados do jogo.');
      }
    };

    fetchGame();
  }, [gameId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/games/${gameId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...game, userId }), // Inclui o ID do usuário
      });

      if (!response.ok) throw new Error('Erro ao atualizar o jogo');

      navigate('/jogosExplorar');
    } catch (err) {
      setError('Erro ao atualizar o jogo.');
    }
  };

  return (
    <div>
      <h1>Atualizar Jogo</h1>
      {error && <p>{error}</p>}
      {game && (
        <form onSubmit={handleUpdate}>
          <label>
            Título:
            <input value={game.g_title} onChange={e => setGame({ ...game, g_title: e.target.value })} />
          </label>
          <label>
            Descrição:
            <input value={game.g_description} onChange={e => setGame({ ...game, g_description: e.target.value })} />
          </label>
          <label>
            Gênero:
            <input value={game.g_genre} onChange={e => setGame({ ...game, g_genre: e.target.value })} />
          </label>
          <label>
            Preço:
            <input value={game.g_price} type="number" onChange={e => setGame({ ...game, g_price: parseFloat(e.target.value) })} />
          </label>
          <label>
            Data de Lançamento:
            <input value={game.g_releaseDate} type="date" onChange={e => setGame({ ...game, g_releaseDate: e.target.value })} />
          </label>
          <label>
            Plataforma:
            <input value={game.g_platform} onChange={e => setGame({ ...game, g_platform: e.target.value })} />
          </label>
          <button type="submit">Atualizar Jogo</button>
        </form>
      )}
    </div>
  );
}
