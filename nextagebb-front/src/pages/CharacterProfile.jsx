import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import PostCard from '../components/PostCard';

export default function CharacterProfile() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const activeCharacterId = localStorage.getItem('activeCharacterId');

    const [character, setCharacter] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (!activeCharacterId) { navigate('/SelectCharacter'); return; }
        const fetchProfileData = async () => {
            try {
                const charRes = await api.get(`/api/characters/${id}`);
                setCharacter(charRes.data);
                const postsRes = await api.get(`/posts/post-character/${id}?viewerId=${activeCharacterId}`);
                setPosts(postsRes.data);
            } catch (error) { alert("Erro ao carregar o perfil."); } 
            finally { setLoading(false); }
        };
        fetchProfileData();
    }, [id, activeCharacterId, navigate]);

    const handleToggleFollow = async () => {
        try {
            if (isFollowing) {
                await api.delete(`/api/characters/${activeCharacterId}/follow/${id}`);
                setIsFollowing(false);
            } else {
                await api.post(`/api/characters/${activeCharacterId}/follow/${id}`);
                setIsFollowing(true);
            }
        } catch (error) { alert("Erro ao interagir com este personagem."); }
    };

    const handleLike = async (postId, currentlyLiked) => {
        try {
            await api.post(`/posts/${postId}/like?characterId=${activeCharacterId}`);
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return { ...post, likedByMe: !currentlyLiked, likesCount: currentlyLiked ? post.likesCount - 1 : post.likesCount + 1 };
                }
                return post;
            }));
        } catch (error) { console.error(error); }
    };

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#8b949e' }}>Loading profile...</h2>;
    if (!character) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#8b949e' }}>Character not found.</h2>;

    const isMyOwnProfile = Number(activeCharacterId) === Number(character.id);

    return (
        <div style={{ padding: '0 20px', maxWidth: '700px', margin: '0 auto' }}>
            
            {/* CABEÇALHO DO PERFIL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px', padding: '30px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <img src={character.photoUrl || `https://ui-avatars.com/api/?name=${character.name || 'Hero'}&background=2f81f7&color=fff`} alt="Avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #30363d' }} />
                
                <div style={{ flex: 1 }}>
                    <h2 style={{ margin: '0 0 10px 0', color: '#e6edf3', fontSize: '28px' }}>{character.name}</h2>
                    <p style={{ margin: '0 0 8px 0', color: '#8b949e', fontSize: '15px' }}>{character.characterClass} • {character.race} • {character.role}</p>
                    <span style={{ display: 'inline-block', backgroundColor: '#0d1117', padding: '4px 10px', borderRadius: '4px', border: '1px solid #30363d', fontSize: '12px', color: '#c9d1d9', fontWeight: 'bold' }}>
                        🎮 Game: {character.gameName || 'Desconhecido'}
                    </span>
                </div>

                {!isMyOwnProfile && (
                    <button onClick={handleToggleFollow} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: isFollowing ? 'transparent' : '#e6edf3', color: isFollowing ? '#f85149' : '#0d1117', border: `1px solid ${isFollowing ? '#f85149' : '#e6edf3'}`, borderRadius: '6px', fontWeight: 'bold', fontSize: '15px' }}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>

            {/* LISTA DE POSTAGENS EXCLUSIVA */}
            <h3 style={{ borderBottom: '1px solid #30363d', paddingBottom: '15px', marginBottom: '25px', color: '#e6edf3', fontSize: '20px' }}>
                Activity
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {posts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#8b949e', padding: '40px 0' }}>This character hasn't posted anything yet.</p>
                ) : (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} activeCharacterId={activeCharacterId} onLike={handleLike} />
                    ))
                )}
            </div>
        </div>
    );
}