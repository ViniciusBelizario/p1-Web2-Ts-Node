import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { GameRanker } from './components/jogosExplorar';
import { LoginUser } from './components/loginUser';
import GamesComponent from './components/GamesComponent';
import { getUserFromLocalStorage } from './utils/localStorageUtils'; // Verifica se o usuário está logado

export function App() {
  const storedUser = getUserFromLocalStorage(); // Verifica se o usuário está salvo no localStorage

  return (
    <Router>
      <Routes>
        {/* Se o usuário estiver logado, ele será redirecionado para a tela de jogos, caso contrário, para o login */}
        <Route path="/" element={storedUser ? <Navigate to="/jogos" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/jogos" element={<GameRanker />} />
        <Route path="/games/top10" element={<GamesComponent />} /> {/* Página para exibir mais detalhes */}
      </Routes>
    </Router>
  );
}