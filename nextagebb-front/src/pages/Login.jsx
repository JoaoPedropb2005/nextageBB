// Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isRegistering) {
                // Registro de usuário
                await api.post('/auth/register', { name, email, password });
                alert('Conta criada com sucesso! Faça login agora.');
                setIsRegistering(false);
            } else {
                // Login
                const response = await api.post('/auth/login', { email, password });
                const token = response.data.token;
                const userId = response.data.userId;

                // Salva token e id do usuário
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                // Verifica se usuário já tem personagens
                const charactersRes = await api.get(`/api/characters/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!charactersRes.data || charactersRes.data.length === 0) {
                    // Nenhum personagem -> vai para criação
                    navigate('/CreateCharacter');
                } else {
                    // Já tem personagens -> vai para seleção
                    navigate('/SelectCharacter');
                }
            }
        } catch (err) {
            setError(err.response?.data || 'Ocorreu um erro ao conectar com o servidor.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0d1117' }}>
            <div style={{ 
                backgroundColor: '#161b22', 
                border: '1px solid #30363d', 
                borderRadius: '10px', 
                padding: '40px', 
                width: '100%', 
                maxWidth: '400px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ textAlign: 'center', color: '#e6edf3', marginBottom: '20px', fontSize: '24px' }}>
                    {isRegistering ? 'Criar Conta' : 'NextageBB'}
                </h2>

                {error && <p style={{ color: '#f85149', backgroundColor: 'rgba(248, 81, 73, 0.1)', padding: '10px', borderRadius: '6px', fontSize: '14px', marginBottom: '15px', border: '1px solid rgba(248, 81, 73, 0.4)' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {isRegistering && (
                        <input type="text" placeholder="Seu Nome" value={name} onChange={(e) => setName(e.target.value)} required />
                    )}
                    <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" style={{ 
                        padding: '12px', cursor: 'pointer', backgroundColor: '#238636', color: 'white', border: '1px solid rgba(240,246,252,0.1)', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' 
                    }}>
                        {isRegistering ? 'Registar' : 'Entrar'}
                    </button>
                </form>

                <p style={{ marginTop: '20px', textAlign: 'center', cursor: 'pointer', color: '#2f81f7', fontSize: '14px' }} onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Já tenho conta. Fazer login.' : 'Não tem conta? Crie uma aqui.'}
                </p>
            </div>
        </div>
    );
}