/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// "Intercetor": Antes de qualquer requisição sair do Frontend, ele verifica se há um token guardado. 
// Se houver, ele anexa o Token no Cabeçalho.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;


