import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PostCard({ post, activeCharacterId, onLike }) {
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);

    const handleToggleComments = async () => {
        if (!showComments && comments.length === 0) {
            try {
                const response = await api.get(`/posts/${post.id}/comments`);
                setComments(response.data);
            } catch (error) { console.error(error); }
        }
        setShowComments(!showComments);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;
        setIsCommenting(true);
        try {
            const response = await api.post(`/posts/${post.id}/comments`, { text: newCommentText, characterId: activeCharacterId });
            setComments([...comments, response.data]);
            setNewCommentText('');
        } catch (error) { alert("Erro ao enviar comentário."); } finally { setIsCommenting(false); }
    };

    return (
        <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
            
            <div onClick={() => navigate(`/profile/${post.authorId}`)} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', cursor: 'pointer' }}>
                <img src={post.authorPhotoUrl || 'https://via.placeholder.com/40'} alt={post.authorName} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #30363d' }} />
                <div>
                    <strong style={{ display: 'block', color: '#e6edf3', fontSize: '15px' }}>{post.authorName}</strong>
                    <span style={{ fontSize: '12px', color: '#8b949e' }}>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#c9d1d9', fontSize: '15px' }}>{post.text}</p>
            {post.imageUrl && (
                <img src={post.imageUrl} alt="Post image" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #30363d', marginBottom: '15px' }} />
            )}

            <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #30363d', paddingTop: '15px' }}>
                <button onClick={() => onLike(post.id, post.likedByMe)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: post.likedByMe ? '#f85149' : '#8b949e', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {post.likedByMe ? '♥' : '♡'} {post.likesCount}
                </button>
                <button onClick={handleToggleComments} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#8b949e', fontWeight: 'bold' }}>
                    💬 {showComments ? 'Hide Comments' : 'Comments'}
                </button>
            </div>

            {showComments && (
                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px dashed #30363d' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '15px' }}>
                        {comments.length === 0 ? <p style={{ fontSize: '13px', color: '#8b949e' }}>No comments yet.</p> : comments.map(comment => (
                            <div key={comment.id} style={{ display: 'flex', gap: '10px' }}>
                                <img src={comment.authorPhotoUrl || 'https://via.placeholder.com/30'} alt="Author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ backgroundColor: '#0d1117', padding: '10px 15px', borderRadius: '8px', flex: 1, border: '1px solid #30363d' }}>
                                    <strong style={{ fontSize: '13px', color: '#e6edf3' }}>{comment.authorName}</strong>
                                    <p style={{ margin: '3px 0 0 0', fontSize: '14px', color: '#c9d1d9' }}>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="Add a comment..." value={newCommentText} onChange={e => setNewCommentText(e.target.value)} style={{ flex: 1 }} required />
                        <button type="submit" disabled={isCommenting} style={{ padding: '0 15px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Post</button>
                    </form>
                </div>
            )}
        </div>
    );
}