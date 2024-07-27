import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JustTest from './pages/justtest';
import Game from './pages/game';
import GamecontextProvider from './context/gameContext';
import Compras from './pages/compras';
 

const GamePack = () => {
    return (
        <GamecontextProvider>
            <Game />
        </GamecontextProvider>
    );
}



const AppRoutes = () => {
    return (
      <Router>
        <Routes>
            <Route path="/cps" element={<JustTest />} />

            <Route path="/game" element={<GamePack/>} />

            <Route path="/compras" element={<Compras />} />
        </Routes>
      </Router>
    );
  };

export default AppRoutes;