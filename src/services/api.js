import axios from 'axios';

const API_URL = import.meta.env.PROD
  ? 'https://budget-tracker-mmqt.onrender.com/api'
  : 'http://localhost:5001/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL
});

// Add interceptor to automatically include token in every request
apiClient.interceptors.request.use(
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

// Expenses API
export const expenseAPI = {
  getAll: () => apiClient.get('/expenses'),
  create: (expenseData) => apiClient.post('/expenses', expenseData),
  update: (id, expenseData) => apiClient.put(`/expenses/${id}`, expenseData),
  delete: (id) => apiClient.delete(`/expenses/${id}`)
};

// Incomes API
export const incomeAPI = {
  getAll: () => apiClient.get('/incomes'),
  create: (incomeData) => apiClient.post('/incomes', incomeData),
  update: (id, incomeData) => apiClient.put(`/incomes/${id}`, incomeData),
  delete: (id) => apiClient.delete(`/incomes/${id}`)
};

// Bills API
export const billAPI = {
  getAll: () => apiClient.get('/bills'),
  create: (billData) => apiClient.post('/bills', billData),
  update: (id, billData) => apiClient.put(`/bills/${id}`, billData),
  delete: (id) => apiClient.delete(`/bills/${id}`)
};

// Savings API
export const savingsAPI = {
  get: () => apiClient.get('/savings'),
  update: (amount) => apiClient.put('/savings', { amount })
};

// User API
export const userAPI = {
  getProfile: () => apiClient.get('/users/profile')
};

// Auth API
export const authAPI = {
  signup: (userData) => apiClient.post('/auth/signup', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials)
};