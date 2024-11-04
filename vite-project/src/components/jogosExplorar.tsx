import { useEffect, useState } from 'react';
import { Navbar } from './navbar';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/localStorageUtils';

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
  const [games, setGames] = useState<Game[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const handleShowMore = () => {
    navigate('/games');
  };

  const handleAddGame = () => {
    navigate('/add-game');
  };

  // Função para buscar todos os jogos
  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Erro ao buscar os jogos:', error);
    }
  };

  // Função para buscar jogos específicos do usuário
  const fetchUserGames = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/games/user/${userId}`);
      const data = await response.json();
      setUserGames(data);
    } catch (error) {
      console.error('Erro ao buscar os jogos do usuário:', error);
    }
  };

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id); // Armazena o userId a partir do localStorage
    }
    fetchGames(); // Busca todos os jogos ao montar o componente
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserGames(); // Busca jogos específicos do usuário se o userId estiver disponível
    }
  }, [userId]);

  const handleUpdateGame = async (game: Game) => {
    // Aqui você pode redirecionar para um formulário de atualização
    navigate('/update-game', { state: { game } }); // Passando os dados do jogo para a página de atualização
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      <div className="px-8 mt-10">
        <h2 className="text-2xl font-bold mb-6">TOP 10 👑</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Exemplo de jogos populares. Você pode adicionar imagens ou outros dados estáticos aqui */}
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

        {/* Exibe os jogos específicos do usuário */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Seus Jogos Cadastrados:</h2>
          <div className="grid grid-cols-1 gap-4">
            {userGames.map((game) => (
              <div key={game.g_id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{game.g_title}</h3>
                <p className="text-gray-400">{game.g_description}</p>
                <p className="text-gray-500">Gênero: {game.g_genre}</p>
                <p className="text-gray-500">Plataforma: {game.g_platform}</p>
                <p className="text-gray-500">Preço: R$ {game.g_price}</p>
                <p className="text-gray-500">Lançamento: {new Date(game.g_releaseDate).toLocaleDateString()}</p>
                <button
                  onClick={() => handleUpdateGame(game)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Atualizar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
