import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivraisonRapidePompe from './pages/LivraisonRapidePompe';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LivraisonRapidePompe />} />
        {/* Tu pourras ajouter d’autres bornes ici plus tard */}
      </Routes>
    </BrowserRouter>
  );
}
