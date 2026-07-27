import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to append Bearer JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('storemind_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const martApi = {
  getProducts: (params) => api.get('/mart/products', { params }),
  getProductByBarcode: (barcode) => api.get(`/mart/products/barcode/${barcode}`),
  createProduct: (data) => api.post('/mart/products', data),
  getCategories: () => api.get('/mart/categories'),
  createCategory: (data) => api.post('/mart/categories', data),
  getCustomers: (params) => api.get('/mart/customers', { params }),
  createCustomer: (data) => api.post('/mart/customers', data),
  createBill: (data) => api.post('/mart/bills', data),
  getBills: () => api.get('/mart/bills'),
};

export const aiApi = {
  getForecast: (productId, days = 7) => api.post('/ai/forecast', { product_id: productId, days }),
  parseVoice: (speechText) => api.post('/ai/voice-parse', { speech_text: speechText }),
  queryRAG: (query) => api.post('/ai/rag-query', { query }),
};
