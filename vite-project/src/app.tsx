import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { GameRanker } from './components/jogosExplorar'
import { Dialog } from './components/ui/dialog'
import { LoginUser } from './components/loginUser'

export function App() {
  return (
    <Router>
      <Dialog>
        <Routes>
          <Route path="/" element={<GameRanker />} />
          <Route path="/login" element={<LoginUser />} />
        </Routes>
      </Dialog>
    </Router>
  )
}
