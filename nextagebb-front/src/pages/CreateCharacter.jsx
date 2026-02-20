import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function MinimalNavbar() {
    return (
        <nav style={{ 
            padding: '15px 40px', 
            backgroundColor: '#161b22', 
            borderBottom: '1px solid #30363d',
            position: 'sticky', top: 0, zIndex: 1000
        }}>
            <span style={{ color: '#2f81f7', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                NextageBB
            </span>
        </nav>
    );
}

export default function CreateCharacter() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [race, setRace] = useState('');
    const [role, setRole] = useState('');
    const [file, setFile] = useState(null);

    const [gameSearch, setGameSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [gameIdApi, setGameIdApi] = useState('');
    const [gameName, setGameName] = useState('');
    const [gameImage, setGameImage] = useState('');

    const handleSearchGames = async () => {
        if (!gameSearch.trim()) return;
        setIsSearching(true);
        setSearchResults([]);
        try {
            const RAWG_API_KEY = 'fb736c11ede74529aef44b91656ee5f9';
            const response = await fetch(`https://api.rawg.io/api/games?search=${gameSearch}&key=${RAWG_API_KEY}&page_size=5`);
            const data = await response.json();
            if (data.results) setSearchResults(data.results);
        } catch (err) {
            alert("Erro ao buscar jogos.");
        } finally { setIsSearching(false); }
    };

    const handleSelectGame = (game) => {
        setGameIdApi(game.id); 
        setGameName(game.name); 
        setGameImage(game.background_image);
        setSearchResults([]); 
        setGameSearch('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gameIdApi) { setError("You must select a game for your character!"); return; }
        setLoading(true); setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('characterClass', characterClass);
        formData.append('race', race);
        formData.append('role', role);
        formData.append('gameIdApi', gameIdApi);
        formData.append('gameName', gameName);
        formData.append('gameImage', gameImage);
        if (file) formData.append('file', file);

        try {
            await api.post('/api/characters', formData, { headers: {'Content-Type': 'multipart/form-data'} });
            navigate('/SelectCharacter');
        } catch (err) {
            setError('Error creating character.');
        } finally { setLoading(false); }
    };

    return (
        <>
            <MinimalNavbar />

            <div style={{ padding: '0 20px', maxWidth: '700px', margin: '0 auto', marginTop: '30px' }}>
                <button onClick={() => navigate('/SelectCharacter')} style={{ marginBottom: '20px', cursor: 'pointer', padding: '6px 12px', background: 'transparent', color: '#c9d1d9', border: '1px solid #30363d', borderRadius: '6px' }}>
                    ← Back
                </button>
            
                <h2 style={{ color: '#e6edf3', marginBottom: '20px', fontSize: '28px' }}>Forge New Hero</h2>
                {error && <p style={{ color: '#f85149', backgroundColor: 'rgba(248, 81, 73, 0.1)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(248, 81, 73, 0.4)' }}>{error}</p>}
            
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {/* Character Data */}
                    <div style={{ backgroundColor: '#161b22', padding: '25px', borderRadius: '10px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h3 style={{ color: '#e6edf3', fontSize: '18px', borderBottom: '1px solid #30363d', paddingBottom: '10px', marginBottom: '5px' }}>Character Data</h3>
                        <input type="text" placeholder="Character Name" value={name} onChange={e => setName(e.target.value)} required />
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <select value={characterClass} onChange={e => setCharacterClass(e.target.value)} required>
                                <option value="" disabled>Class</option>
                                <option value="Guerreiro">Guerreiro</option>
                                <option value="Paladino">Paladino</option>
                                <option value="Caçador">Caçador</option>
                                <option value="Ladino">Ladino</option>
                                <option value="Sacerdote">Sacerdote</option>
                                <option value="Cavaleiro">Cavaleiro</option>
                                <option value="Xamã">Xamã</option>
                                <option value="Mago">Mago</option>
                                <option value="Bruxo">Bruxo</option>
                                <option value="Monge">Monge</option>
                                <option value="Druida">Druida</option>
                            </select>
                            <select value={race} onChange={e => setRace(e.target.value)} required>
                                <option value="" disabled>Race</option>
                                <option value="Humano">Humano</option>
                                <option value="Elfo">Elfo</option>
                                <option value="Orc">Orc</option>
                                <option value="Anão">Anão</option>
                                <option value="MortoVivo">Zumbi</option>
                                <option value="Troll">Troll</option>
                                <option value="Gnomo">Gnomo</option>
                                <option value="Duende">Duende</option>
                                <option value="Demônio">Demônio</option>
                            </select>
                            <select value={role} onChange={e => setRole(e.target.value)} required>
                                <option value="" disabled>Role</option>
                                <option value="Tank">Tank</option>
                                <option value="Healer">Healer</option>
                                <option value="Damage">Damage</option>
                                <option value="Support">Support</option>
                            </select>
                        </div>

                        <label style={{ fontSize: '14px', color: '#8b949e', marginTop: '10px' }}>Character Photo (Optional):</label>
                        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} style={{ padding: '5px', backgroundColor: 'transparent', border: 'none' }} />
                    </div>

                    {/* Game Data */}
                    <div style={{ backgroundColor: '#161b22', padding: '25px', borderRadius: '10px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h3 style={{ color: '#e6edf3', fontSize: '18px', borderBottom: '1px solid #30363d', paddingBottom: '10px', marginBottom: '5px' }}>Link to a Game</h3>

                        {gameIdApi ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #238636', padding: '15px', borderRadius: '8px', backgroundColor: 'rgba(35, 134, 54, 0.1)' }}>
                                <img src={gameImage} alt={gameName} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#e6edf3', fontSize: '18px' }}>{gameName}</h4>
                                    <span style={{ fontSize: '13px', color: '#8b949e' }}>RAWG ID: {gameIdApi}</span>
                                </div>
                                <button type="button" onClick={() => setGameIdApi('')} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: 'transparent', color: '#f85149', border: '1px solid #f85149', borderRadius: '6px' }}>
                                    Change Game
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" placeholder="Search game title..." value={gameSearch} onChange={e => setGameSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleSearchGames())} style={{ flex: 1 }} />
                                    <button type="button" onClick={handleSearchGames} disabled={isSearching} style={{ padding: '0 20px', cursor: 'pointer', backgroundColor: '#2f81f7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
                                        {isSearching ? '...' : 'Search'}
                                    </button>
                                </div>
                                {searchResults.length > 0 && (
                                    <div style={{ border: '1px solid #30363d', borderRadius: '6px', maxHeight: '250px', overflowY: 'auto', backgroundColor: '#0d1117' }}>
                                        {searchResults.map(game => (
                                            <div key={game.id} onClick={() => handleSelectGame(game)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #30363d' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#161b22'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <img src={game.background_image || 'https://via.placeholder.com/50'} alt={game.name} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <strong style={{ color: '#c9d1d9', fontSize: '15px' }}>{game.name}</strong>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <button type="submit" disabled={loading || !gameIdApi} style={{ padding: '15px', cursor: (loading || !gameIdApi) ? 'not-allowed' : 'pointer', backgroundColor: (loading || !gameIdApi) ? '#30363d' : '#238636', color: (loading || !gameIdApi) ? '#8b949e' : 'white', border: '1px solid rgba(240,246,252,0.1)', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
                        {loading ? 'Forging...' : 'Create Character'}
                    </button>
                </form>
            </div>
        </>
    );
}