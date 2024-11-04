import { useEffect, useState } from 'react';
import { Navbar } from './navbar';
import fifa from '../assets/fifa.svg';
import godOfWar from '../assets/godOfWar.svg';
import red from '../assets/reddead.svg';
import hollow from '../assets/hollow.svg';
import { useNavigate } from 'react-router-dom';

interface Game {
  g_id: string;
  g_title: string;
  g_description: string;
  g_genre: string;
  g_price: number;
  g_releaseDate: string;
  g_platform: string;
}

export function GameRanker() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]); // Estado com o tipo Game[]

  const handleShowMore = () => {
    navigate('/games');
  };

  const handleAddGame = () => {
    navigate('/add-game'); // Navega para a rota de cadastro do jogo
  };

  // Função para buscar os jogos cadastrados
  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Erro ao buscar os jogos:', error);
    }
  };

  useEffect(() => {
    fetchGames(); // Busca os jogos quando o componente é montado
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      <div className="px-8 mt-10">
        <h2 className="text-2xl font-bold mb-6">TOP 10 👑</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <img src={red} alt="Red Dead" className="rounded-lg w-full h-40 object-cover" />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <img src={fifa} alt="FIFA 25" className="rounded-lg w-full h-40 object-cover" />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <img src={godOfWar} alt="God of War" className="rounded-lg w-full h-40 object-cover" />
          </div>
        </div>
        <div className="text-right mt-4">
          <a onClick={handleShowMore} className="text-sm text-gray-400 hover:text-gray-200">
            Exibir mais...
          </a>
        </div>
      </div>

      <div className="px-8 mt-12">
        <h2 className="text-xl font-bold mb-4">Explore:</h2>
        <button
          onClick={handleAddGame}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm mb-4"
        >
          Cadastrar Jogo
        </button>

        {/* Exibe os jogos cadastrados */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Jogos Cadastrados:</h2>
          <div className="grid grid-cols-1 gap-4">
            {games.map((game) => (
              <div key={game.g_id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{game.g_title}</h3>
                <p className="text-gray-400">{game.g_description}</p>
                <p className="text-gray-500">Gênero: {game.g_genre}</p>
                <p className="text-gray-500">Plataforma: {game.g_platform}</p>
                <p className="text-gray-500">Preço: R$ {game.g_price}</p>
                <p className="text-gray-500">Lançamento: {new Date(game.g_releaseDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
