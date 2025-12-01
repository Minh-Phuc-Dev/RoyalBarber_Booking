import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    timeout: 60 * 1000,
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
        return Promise.reject(error);
    }
);

export const requestApiHelper = async (promise) => {
    try {
        const { data } = await promise;
        return data;
    } catch (error) {
        if (error.isAxiosError) {
            return {
                error: true,
                success: false,
                errorDetail: error,
                code: error?.response?.data?.code,
                httpStatus: error?.response?.status,
                payload: error?.response?.data?.payload,
            };
        }

        return {
            error: true,
            success: false,
            errorDetail: error,
        };
    }
};


export default api;