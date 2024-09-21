import { useState, useEffect } from 'react'
import fifa from '../assets/fifa.svg'
import godOfWar from '../assets/godOfWar.svg'
import red from '../assets/reddead.svg'
import hollow from '../assets/hollow.svg'
import { useNavigate } from 'react-router-dom'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../utils/localStorageUtils' // Importa as funções

export function GameRanker() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null) // Estado para o usuário logado
  const navigate = useNavigate()

  const handleLogout = () => {
    removeUserFromLocalStorage() // Remove o usuário do localStorage
    setLoggedInUser(null)
    navigate('/login')
  }

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const storedUser = getUserFromLocalStorage() // Obtém o usuário do localStorage
    if (storedUser) {
      setLoggedInUser(storedUser)
    }
  }, [])

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">GAMERANKER</h1>
          <div className="space-x-6">
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a href="#" className="text-sm hover:text-gray-400">
              Jogos
            </a>
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a href="#" className="text-sm hover:text-gray-400">
              Gênero
            </a>
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a href="#" className="text-sm hover:text-gray-400">
              Minha Biblioteca
            </a>
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a href="#" className="text-sm hover:text-gray-400">
              Comunidade
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Busca"
            className="px-4 py-2 rounded-lg bg-gray-700 text-sm placeholder-gray-400 focus:outline-none"
          />
          {/* Verifica se o usuário está logado */}
          {loggedInUser ? (
            <div className="flex items-center space-x-4">
              <span>Bem-vindo, {loggedInUser}!</span>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
              onClick={handleLoginClick}
            >
              Entrar
            </button>
          )}
        </div>
      </nav>

      {/* Top 10 Section */}
      <div className="px-8 mt-10">
        <h2 className="text-2xl font-bold mb-6">TOP 10 👑</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <img
              src={red}
              alt="Red Dead"
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <img
              src={fifa}
              alt="FIFA 25"
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <img
              src={godOfWar}
              alt="God of War"
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
        </div>
        <div className="text-right mt-4">
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="#" className="text-sm text-gray-400 hover:text-gray-200">
            Exibir mais...
          </a>
        </div>
      </div>

      {/* Explore Section */}
      <div className="px-8 mt-12">
        <h2 className="text-xl font-bold mb-4">Explore:</h2>
        <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={hollow}
              alt="Hollow Knight"
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">Hollow Knight</h3>
              <div className="bg-gray-700 rounded-lg h-2 w-40 mt-2 relative">
                <div
                  className="bg-purple-600 h-full rounded-lg"
                  style={{ width: '98%' }}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm mr-4"
            >
              Avaliar
            </button>
            <span className="text-gray-400 text-sm">4.9/5.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
