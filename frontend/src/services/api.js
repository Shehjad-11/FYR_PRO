import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

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
  updateProduct: (id, data) => api.put(`/mart/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/mart/products/${id}`),
  getCategories: () => api.get('/mart/categories'),
  createCategory: (data) => api.post('/mart/categories', data),
  getCustomers: (params) => api.get('/mart/customers', { params }),
  getCustomerDetails: (id) => api.get(`/mart/customers/${id}`),
  createCustomer: (data) => api.post('/mart/customers', data),
  payUdhar: (id, data) => api.post(`/mart/customers/${id}/udhar-payment`, data),
  createBill: (data) => api.post('/mart/bills', data),
  getBills: (params) => api.get('/mart/bills', { params }),
  getReportsSummary: (timeframe = '7d') => api.get('/mart/reports/summary', { params: { timeframe } }),
};

export const aiApi = {
  getForecast: (productId, days = 7) => api.post('/ai/forecast', { product_id: productId, days }),
  parseVoice: (speechText) => api.post('/ai/voice-parse', { speech_text: speechText }),
  queryRAG: (query) => api.post('/ai/rag-query', { query }),
};

export const adminApi = {
  getExecutiveMetrics: () => api.get('/admin/executive-metrics'),
  getMerchants: (params) => api.get('/admin/merchants', { params }),
  updateMerchantStatus: (orgId, isActive) => api.put(`/admin/merchants/${orgId}/status`, null, { params: { is_active: isActive } }),
  getSubscriptions: () => api.get('/admin/subscriptions'),
  getAiUsage: () => api.get('/admin/ai-usage'),
  getPlatformHealth: () => api.get('/admin/platform-health'),
};

