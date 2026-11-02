import axios from 'axios';

// Defaults to localhost:5000 in local development, or configured Render/production endpoint
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? 'https://career-navigator-2cwd.onrender.com' : 'http://localhost:5000'),
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for safe 401 session handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthRoute = error.config && (error.config.url.includes('/auth/login') || error.config.url.includes('/auth/signup'));
      if (!isAuthRoute) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined' && window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
