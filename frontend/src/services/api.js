import axios from 'axios';

// Always use the production backend URL when deployed
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Task API calls
export const taskAPI = {
  getAll: () => api.get('/tasks'),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`),
  delete: (id) => api.delete(`/tasks/${id}`),
  getByEmployee: (employeeId) => api.get(`/tasks/employee/${employeeId}`),
  getStats: () => api.get('/tasks/stats/dashboard'),
};

export default api;
