import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/localStorageUtils';

export function UpdateGame() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { game } = location.state; // Obtém o jogo passado pela navegação

  useEffect(() => {
    if (game) {
      setTitle(game.g_title);
      setDescription(game.g_description);
      setGenre(game.g_genre);
      setPrice(game.g_price.toString());
      setReleaseDate(game.g_releaseDate);
      setPlatform(game.g_platform);
    }
  }, [game]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = getUserFromLocalStorage();
    if (!storedUser || !storedUser.id) {
      setError('Erro ao atualizar o jogo: ID do usuário não encontrado.');
      return;
    }

    const userId = storedUser.id;

    try {
      const response = await fetch(`http://localhost:5000/api/games/${game.g_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          g_title: title,
          g_description: description,
          g_genre: genre,
          g_price: parseFloat(price),
          g_releaseDate: releaseDate,
          g_platform: platform,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Erro ao atualizar o jogo: ${errorData.error}`);
        return;
      }

      setSuccess('Jogo atualizado com sucesso!');
      setTimeout(() => {
        navigate('/jogosExplorar'); // Redireciona para a lista de jogos após 2 segundos
      }, 2000);
    } catch (err) {
      console.error('Erro ao atualizar o jogo:', err);
      setError('Erro ao atualizar o jogo: Ocorreu um problema no servidor.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6">Atualizar Jogo</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-80">
        <label className="block mb-4">
          <span className="text-gray-300">Título:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Descrição:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Gênero:</span>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Preço:</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
            step="0.01"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Data de Lançamento:</span>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Plataforma:</span>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
            required
          />
        </label>
        <button type="submit" className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg">
          Atualizar Jogo
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 mt-4">
          {success}
        </p>
      )}
    </div>
  );
}
