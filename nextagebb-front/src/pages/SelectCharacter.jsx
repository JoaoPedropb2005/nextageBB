import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function SelectCharacter() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await api.get('/api/characters/my-characters');
                setCharacters(response.data);
            } catch (error) {
                if (error.response?.status === 403) { localStorage.clear(); navigate('/'); }
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [navigate]);

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#8b949e' }}>Loading roster...</h2>;

    return (
        <div style={{ padding: '0 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: '#e6edf3', fontSize: '28px', fontWeight: 'bold' }}>Your Roster</h2>
                <button onClick={() => navigate('/CreateCharacter')} style={{ background: '#2f81f7', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                    + New Character
                </button>
            </div>

            {characters.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#8b949e' }}>No characters found. Create one to start your journey.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                    {characters.map(char => (
                        <div key={char.id} onClick={() => { localStorage.setItem('activeCharacterId', char.id); navigate('/Feed'); }}
                            style={{ 
                                backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '10px', 
                                overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s',
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#8b949e'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#30363d'; }}
                        >
                            <img src={char.photoUrl || 'https://via.placeholder.com/200?text=No+Photo'} alt={char.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '15px' }}>
                                <h3 style={{ margin: '0 0 5px 0', color: '#e6edf3', fontSize: '16px' }}>{char.name}</h3>
                                <p style={{ margin: '0', color: '#8b949e', fontSize: '12px' }}>{char.characterClass}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}