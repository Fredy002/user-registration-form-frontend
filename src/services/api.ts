import axios from 'axios';

const api = axios.create({
    baseURL: 'https://crud-api-laravel-production.up.railway.app/api', // URL del backend
});

export default api;
