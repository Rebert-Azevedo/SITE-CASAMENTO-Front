import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const adminSecretKey = localStorage.getItem('adminSecretKey');

        if (adminSecretKey) {
            config.headers['X-Admin-Key'] = adminSecretKey; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;