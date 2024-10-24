import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorageUtils'; // Ajuste o caminho de acordo com seu projeto

export function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(getUserFromLocalStorage()?.name || null);
  const [showMenu, setShowMenu] = useState(false); // Estado para exibir/ocultar o menu suspenso
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUserFromLocalStorage(); // Remove o usuário do localStorage
    setLoggedInUser(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Alterna a exibição do menu suspenso
  };

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  return (
    <nav className="flex justify-between items-center px-16 py-4 bg-gray-800"> {/* Aumentei o padding lateral (px-16) */}
  <div className="flex items-center space-x-12"> {/* Aumentei o espaço entre o logo e os links */}
    <h1 className="text-3xl font-bold">GAMERANKER</h1>
    <div className="flex space-x-10"> {/* Aumentei o espaço entre os links */}
      <a href="/jogos" className="text-sm hover:text-gray-400">Jogos</a>
      <a href="#" className="text-sm hover:text-gray-400">Gênero</a>
      <a href="#" className="text-sm hover:text-gray-400">Minha Biblioteca</a>
      <a href="#" className="text-sm hover:text-gray-400">Comunidade</a>
    </div>
  </div>

  <div className="flex items-center space-x-8"> {/* Aumentei o espaço entre a busca e o ícone de usuário */}
    {/* Campo de busca com ícone de lupa */}
    <div className="relative">
      <input
        type="text"
        placeholder="Busca"
        className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-sm placeholder-gray-400 focus:outline-none w-64"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>

    {loggedInUser ? (
      <div className="relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          <FaUserCircle className="text-3xl text-white" />
        </button>

        {/* Menu suspenso */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
            <ul className="py-2 text-sm text-white">
              <li>
                <button
                  onClick={handleProfileClick}
                  className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                >
                  Meu Perfil
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    ) : (
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
        onClick={() => navigate('/login')}
      >
        Entrar
      </button>
    )}
  </div>
</nav>
  );
}
