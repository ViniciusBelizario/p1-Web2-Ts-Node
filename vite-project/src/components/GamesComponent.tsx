import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: string;
  title: string;
  genre: string;
  releaseDate: string;
  developer?: string; // Opcional, caso não tenha no backend
}

const GamesComponent: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        // Mapeia os dados para se adequar à interface Game
        const mappedGames = data.map((game: any) => ({
          id: game.g_id,
          title: game.g_title,
          genre: game.g_genre,
          releaseDate: new Date(game.g_releaseDate).toLocaleDateString(),
          developer: game.g_developer || 'Desconhecido', // Campo opcional
        }));
        setGames(mappedGames);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        setError('Erro ao carregar os jogos. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleBack = () => {
    navigate('/jogos');
  };

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen p-8">
        <button
          type="button"
          onClick={handleBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition mb-6"
        >
          Voltar
        </button>
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <button
        type="button"
        onClick={handleBack}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition mb-6"
      >
        Voltar
      </button>
      <h1 className="text-3xl text-white font-bold mb-6">Lista de Jogos</h1>
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-gray-800 rounded-lg p-4 mb-4 flex items-center justify-between shadow-md"
        >
          <div>
            <h2 className="text-xl font-semibold text-white">{game.title}</h2>
            <p className="text-sm text-gray-400">Gênero: {game.genre}</p>
            <p className="text-sm text-gray-400">Data de Lançamento: {game.releaseDate}</p>
            <p className="text-sm text-gray-400">Desenvolvedor: {game.developer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesComponent;
