import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
    console.log(config);
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// // Pair API methods
// export const pairApi = {
//   // Get all pairs
//   getAll: async () => {
//     const response = await api.get('/pairs');
//     return response.data;
//   },

//   // Get a specific pair
//   getById: async (id) => {
//     const response = await api.get(`/pairs/${id}`);
//     return response.data;
//   },

//   // Create a new pair
//   create: async (pairData) => {
//     const response = await api.post('/pairs', pairData);
//     return response.data;
//   },

//   // Update a pair
//   update: async (id, pairData) => {
//     const response = await api.put(`/pairs/${id}`, pairData);
//     return response.data;
//   },

//   // Delete a pair
//   delete: async (id) => {
//     const response = await api.delete(`/pairs/${id}`);
//     return response.data;
//   },

//   // Duplicate a pair
//   duplicate: async (id) => {
//     const response = await api.post(`/pairs/${id}/duplicate`);
//     return response.data;
//   },

//   // Update pair status
//   updateStatus: async (id, status) => {
//     const response = await api.patch(`/pairs/${id}/status`, { status });
//     return response.data;
//   },

//   // Update pair checklist
//   updateChecklist: async (id, timeframe, condition, value) => {
//     const response = await api.patch(`/pairs/${id}/checklist`, {
//       timeframe,
//       condition,
//       value,
//     });
//     return response.data;
//   },
// };

// // Authentication API methods
// export const authApi = {
//   // Login
//   login: async (credentials) => {
//     const response = await api.post('/auth/login', credentials);
//     return response.data;
//   },

//   // Register
//   register: async (userData) => {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   },

//   // Get current user
//   getCurrentUser: async () => {
//     const response = await api.get('/auth/me');
//     return response.data;
//   },

//   // Logout
//   logout: async () => {
//     const response = await api.post('/auth/logout');
//     return response.data;
//   },
// };

// // Journal API methods
// export const journalApi = {
//   // Get all journal entries
//   getAll: async () => {
//     const response = await api.get('/journal');
//     return response.data;
//   },

//   // Create a journal entry
//   create: async (entryData) => {
//     const response = await api.post('/journal', entryData);
//     return response.data;
//   },

//   // Update a journal entry
//   update: async (id, entryData) => {
//     const response = await api.put(`/journal/${id}`, entryData);
//     return response.data;
//   },

//   // Delete a journal entry
//   delete: async (id) => {
//     const response = await api.delete(`/journal/${id}`);
//     return response.data;
//   },
// };

// // Dashboard API methods
// export const dashboardApi = {
//   // Get dashboard statistics
//   getStats: async () => {
//     const response = await api.get('/dashboard/stats');
//     return response.data;
//   },

//   // Get performance data
//   getPerformance: async () => {
//     const response = await api.get('/dashboard/performance');
//     return response.data;
//   },
// };

// export default api;

const res = api.get('/health')
console.log(res);
