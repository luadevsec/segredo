import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JustTest from './pages/justtest';
import Game from './pages/game';
 



const AppRoutes = () => {
    return (
      <Router>
        <Routes>
            <Route path="/cps" element={<JustTest />} />
            <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    );
  };

export default AppRoutes;