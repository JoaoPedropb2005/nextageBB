import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
                if (error.response?.status === 403) { 
                    localStorage.clear(); 
                    navigate('/'); 
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [navigate]);

    if (loading) {
        return (
            <>
                <Navbar hideSearch={true} />
                <h2 style={{ 
                    textAlign: 'center', 
                    marginTop: '80px', 
                    color: '#8b949e' 
                }}>
                    Loading roster...
                </h2>
            </>
        );
    }

    return (
        <>
            <Navbar 
                hideSearch={true}
                customButton={
                    <button 
                        onClick={() => navigate('/CreateCharacter')} 
                        style={{ 
                            background: '#2f81f7',
                            border: 'none',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 'bold'
                        }}
                    >
                        + New Character
                    </button>
                }
            />

            <div style={{ 
                padding: '40px 20px', 
                maxWidth: '1000px', 
                margin: '0 auto' 
            }}>

                <h2 style={{ 
                    color: '#e6edf3', 
                    fontSize: '28px', 
                    fontWeight: 'bold',
                    marginBottom: '30px'
                }}>
                    Your Roster
                </h2>

                {characters.length === 0 ? (
                    <p style={{ 
                        textAlign: 'center', 
                        color: '#8b949e' 
                    }}>
                        No characters found. Create one to start your journey.
                    </p>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                        gap: '20px' 
                    }}>
                        {characters.map(char => (
                            <div 
                                key={char.id} 
                                onClick={() => { 
                                    localStorage.setItem('activeCharacterId', char.id); 
                                    navigate('/Feed'); 
                                }}
                                style={{ 
                                    backgroundColor: '#161b22', 
                                    border: '1px solid #30363d', 
                                    borderRadius: '12px', 
                                    overflow: 'hidden', 
                                    cursor: 'pointer', 
                                    transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                                }}
                                onMouseOver={(e) => { 
                                    e.currentTarget.style.transform = 'translateY(-6px)'; 
                                    e.currentTarget.style.borderColor = '#2f81f7';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={(e) => { 
                                    e.currentTarget.style.transform = 'translateY(0)'; 
                                    e.currentTarget.style.borderColor = '#30363d';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <img 
                                    src={char.photoUrl || 'https://via.placeholder.com/300x220?text=No+Photo'} 
                                    alt={char.name} 
                                    style={{ 
                                        width: '100%', 
                                        height: '220px', 
                                        objectFit: 'cover' 
                                    }} 
                                />

                                <div style={{ padding: '15px' }}>
                                    <h3 style={{ 
                                        margin: '0 0 5px 0', 
                                        color: '#e6edf3', 
                                        fontSize: '16px' 
                                    }}>
                                        {char.name}
                                    </h3>

                                    <p style={{ 
                                        margin: '0', 
                                        color: '#8b949e', 
                                        fontSize: '12px' 
                                    }}>
                                        {char.characterClass}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}