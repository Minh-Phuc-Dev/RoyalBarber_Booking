import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authenticate token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password, role) => api.post('/login', { email, password, role }),
  register: (userData) => api.post('/register', userData),
  getProfile: () => api.get('/me'),
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('services'),
  getById: (id) => api.get(`services/${id}`),
  getByCategory: (category) => api.get(`services/category/${category}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  update: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// Promotions API
export const promotionsAPI = {
  getAll: () => api.get('/promotions'),
  getActive: () => api.get('/promotions/active'),
  getById: (id) => api.get(`/promotions/${id}`),
  getByCode: (code) => api.get(`/promotions/code/${code}`),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
};

export default api;
export { api };