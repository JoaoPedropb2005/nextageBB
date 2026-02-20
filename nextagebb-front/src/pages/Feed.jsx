import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PostCard from '../components/PostCard'; // <-- Importamos a pecinha de Lego aqui!

export default function Feed() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPostText, setNewPostText] = useState('');
    const [newPostFile, setNewPostFile] = useState(null);
    const [isPosting, setIsPosting] = useState(false);

    const activeCharacterId = localStorage.getItem('activeCharacterId');

    const fetchTimeline = async () => {
        try {
            const response = await api.get(`/posts/timeline/${activeCharacterId}`);
            setPosts(response.data);
        } catch (error) {
            if (error.response?.status === 403) navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!activeCharacterId) {
            navigate('/SelectCharacter');
            return;
        }
        fetchTimeline();
    }, [activeCharacterId, navigate]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPostText.trim()) return;

        setIsPosting(true);
        const formData = new FormData();
        formData.append('text', newPostText);
        formData.append('characterId', activeCharacterId);
        if (newPostFile) formData.append('file', newPostFile);

        try {
            await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setNewPostText('');
            setNewPostFile(null);
            fetchTimeline();
        } catch (error) {
            alert("Erro ao criar a postagem.");
        } finally {
            setIsPosting(false);
        }
    };

    const handleLike = async (postId, currentlyLiked) => {
        try {
            await api.post(`/posts/${postId}/like?characterId=${activeCharacterId}`);
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likedByMe: !currentlyLiked,
                        likesCount: currentlyLiked ? post.likesCount - 1 : post.likesCount + 1
                    };
                }
                return post;
            }));
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading timeline...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>

            {/* ÁREA DE CRIAR POST */}
            <form onSubmit={handleCreatePost} style={{ 
                border: '1px solid #30363d', 
                borderRadius: '10px', 
                padding: '20px', 
                marginBottom: '40px', 
                backgroundColor: '#161b22', // Fundo escuro igual aos cartões
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}>
                <textarea 
                    placeholder="What's happening in your game world?" 
                    value={newPostText}
                    onChange={e => setNewPostText(e.target.value)}
                    style={{ 
                        width: '100%', 
                        height: '80px', 
                        padding: '15px', 
                        marginBottom: '15px', 
                        borderRadius: '8px', 
                        border: '1px solid #30363d', 
                        resize: 'none',
                        backgroundColor: '#0d1117', // Fundo mais escuro para o campo de texto
                        color: '#c9d1d9',
                        fontSize: '15px'
                    }}
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => setNewPostFile(e.target.files[0])} 
                        style={{ fontSize: '14px', color: '#8b949e', backgroundColor: 'transparent', border: 'none' }} 
                    />
                    <button 
                        type="submit" 
                        disabled={isPosting} 
                        style={{ 
                            padding: '8px 25px', 
                            cursor: isPosting ? 'not-allowed' : 'pointer', 
                            backgroundColor: isPosting ? '#30363d' : '#238636', // Verde escuro padrão
                            color: isPosting ? '#8b949e' : 'white', 
                            border: '1px solid rgba(240,246,252,0.1)', 
                            borderRadius: '6px', 
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }}
                    >
                        {isPosting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {posts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666' }}>No posts yet. Follow some characters or create a post!</p>
                ) : (
                    posts.map(post => (
                        /* O FEED AGORA CHAMA O COMPONENTE POSTCARD PARA CADA POSTAGEM */
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            activeCharacterId={activeCharacterId} 
                            onLike={handleLike} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}