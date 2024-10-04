import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://crud-api-laravel-production.up.railway.app/api', // URL del backend
    baseURL: 'http://localhost:8000/api', // URL del backend
});

export default api;
