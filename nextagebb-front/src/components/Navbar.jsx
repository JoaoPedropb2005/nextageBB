import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Navbar({ showCharacter = true, showFindPlayers = true, hideSearch = false, customButton }) {
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const activeCharacterId = localStorage.getItem('activeCharacterId');

    useEffect(() => {
        if (activeCharacterId && showCharacter) {
            api.get(`/api/characters/${activeCharacterId}`)
               .then(response => setCharacter(response.data))
               .catch(error => console.error("Erro na Navbar", error));
        }
    }, [activeCharacterId, showCharacter]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <nav style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            padding: '15px 40px', 
            backgroundColor: '#161b22', 
            borderBottom: '1px solid #30363d',
            position: 'sticky', top: 0, zIndex: 1000
        }}>  
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <Link to="/Feed" style={{ color: '#2f81f7', textDecoration: 'none', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                    NextageBB
                </Link>
                {/* Se hideSearch for true, o link Find Players é escondido */}
                {showFindPlayers && !hideSearch && (
                    <Link to="/search" style={{ color: '#c9d1d9', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }}>
                        Find Players
                    </Link>
                )}
            </div>

            {showCharacter && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    {character && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={character.photoUrl || `https://ui-avatars.com/api/?name=${character.name || 'Hero'}&background=2f81f7&color=fff`} alt="Avatar" style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #30363d' }} />
                            <strong style={{ fontSize: '14px', color: '#e6edf3' }}>{character.name}</strong>
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {/* Se o SelectCharacter enviar um customButton, ele aparece aqui. Se não, mostra o Switch Character normal */}
                        {customButton ? (
                            customButton
                        ) : (
                            <button onClick={() => { localStorage.removeItem('activeCharacterId'); navigate('/SelectCharacter'); }} style={{ background: 'transparent', border: '1px solid #30363d', color: '#c9d1d9', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                                Switch Character
                            </button>
                        )}
                        <button onClick={handleLogout} style={{ background: '#238636', border: '1px solid rgba(240,246,252,0.1)', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}