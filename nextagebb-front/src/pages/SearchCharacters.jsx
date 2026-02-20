import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function SearchCharacters() {
    const navigate = useNavigate();
    const activeCharacterId = localStorage.getItem('activeCharacterId');
    
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            const response = await api.get(`/api/characters/search?myCharacterId=${activeCharacterId}&name=${searchTerm}`);
            setResults(response.data);
            setHasSearched(true);
        } catch (error) {
            console.error("Erro na busca:", error);
            alert("Erro ao pesquisar jogadores.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#e6edf3', fontSize: '28px', marginBottom: '20px' }}>Find Players</h2>
            <p style={{ color: '#8b949e', marginBottom: '30px' }}>Search for other characters exploring the same game universe as you.</p>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <input 
                    type="text" 
                    placeholder="Search by character name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '12px', fontSize: '16px' }}
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ padding: '0 25px', backgroundColor: '#2f81f7', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {hasSearched && results.length === 0 && (
                <p style={{ textAlign: 'center', color: '#8b949e', padding: '40px 0', backgroundColor: '#161b22', borderRadius: '10px', border: '1px solid #30363d' }}>
                    No characters found in your game with that name.
                </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {results.map(char => (
                    <div 
                        key={char.id} 
                        onClick={() => navigate(`/profile/${char.id}`)}
                        style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#8b949e'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#30363d'}
                    >
                        <img 
                            src={char.photoUrl || 'https://via.placeholder.com/80'} 
                            alt={char.name} 
                            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #30363d' }} 
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#e6edf3', fontSize: '20px' }}>{char.name}</h3>
                            <p style={{ margin: '0', color: '#8b949e', fontSize: '14px' }}>{char.characterClass} • {char.race}</p>
                        </div>
                        <button style={{ backgroundColor: 'transparent', color: '#2f81f7', border: '1px solid #2f81f7', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold' }}>
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}