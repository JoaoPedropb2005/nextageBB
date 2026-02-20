import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SelectCharacter from './pages/SelectCharacter';
import CreateCharacter from './pages/CreateCharacter';
import Feed from './pages/Feed';
import CharacterProfile from './pages/CharacterProfile';
import Layout from './components/Layout'; // <-- Importe o Layout
import SearchCharacters from './pages/SearchCharacters';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Telas que NÃO têm a Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/CreateCharacter" element={<CreateCharacter />} />
        <Route path="/SelectCharacter" element={<SelectCharacter />} />
        
        {/* Telas que TÊM a Navbar (Agrupadas dentro do Layout) */}
        <Route element={<Layout />}>
            <Route path="/Feed" element={<Feed />} />
            <Route path="/profile/:id" element={<CharacterProfile />} />
            <Route path="/search" element={<SearchCharacters />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;