import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddGame() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const gameData = {
      g_title: title,
      g_description: description,
      g_genre: genre,
      g_price: parseFloat(price),
      g_releaseDate: releaseDate,
      g_platform: platform,
    };

    try {
      const response = await fetch('http://localhost:5000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        setMessage('Jogo cadastrado com sucesso!');
        
        // Limpa os campos do formulário após o envio bem-sucedido
        setTitle('');
        setDescription('');
        setGenre('');
        setPrice('');
        setReleaseDate('');
        setPlatform('');

        // Redireciona para a página de "Explorar" após o cadastro
        navigate('/jogos');
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao cadastrar o jogo: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6">Cadastrar Novo Jogo</h1>
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
          Cadastrar Jogo
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
