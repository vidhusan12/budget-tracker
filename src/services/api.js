import axios from 'axios';

const API_URL = 'http://localhost:5001/api';


// Expenses API
export const expenseAPI = {
  getAll: () => axios.get(`${API_URL}/expenses`),
  create: (expenseData) => axios.post(`${API_URL}/expenses`, expenseData),
  update: (id, expenseData) => axios.put(`${API_URL}/expenses/${id}`, expenseData),
  delete: (id) => axios.delete(`${API_URL}/expenses/${id}`)
};

// Incomes API
export const incomeAPI = {
  getAll: () => axios.get(`${API_URL}/incomes`),
  create: (incomeData) => axios.post(`${API_URL}/incomes`, incomeData),
  update: (id, incomeData) => axios.put(`${API_URL}/incomes/${id}`, incomeData),
  delete: (id) => axios.delete(`${API_URL}/incomes/${id}`)
};

// Bills API
export const billAPI = {
  getAll: () => axios.get(`${API_URL}/bills`),
  create: (billData) => axios.post(`${API_URL}/bills`, billData),
  update: (id, billData) => axios.put(`${API_URL}/bills/${id}`, billData),
  delete: (id) => axios.delete(`${API_URL}/bills/${id}`)
};

// Savings API
export const savingsAPI = {
  get: () => axios.get(`${API_URL}/savings`),
  update: (amount) => axios.put(`${API_URL}/savings`, { amount })
};