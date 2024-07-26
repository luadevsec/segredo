import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';




const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  };

export default AppRoutes;