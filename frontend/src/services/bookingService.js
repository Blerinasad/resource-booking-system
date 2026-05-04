import apiClient from './apiClient.js';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

const bookingService = {
  getAll: async (params = {}) => unwrap(await apiClient.get('/bookings', { params })),
  adminAll: async (params = {}) => unwrap(await apiClient.get('/bookings', { params })),
  getById: async (id) => unwrap(await apiClient.get(`/bookings/${id}`)),
  create: async (data) => unwrap(await apiClient.post('/bookings', data)),
  cancel: async (id) => unwrap(await apiClient.patch(`/bookings/${id}/cancel`)),
  approve: async (id, decisionNote = '') => unwrap(await apiClient.patch(`/bookings/admin/${id}/approve`, { decisionNote })),
  reject: async (id, decisionNote = '') => unwrap(await apiClient.patch(`/bookings/admin/${id}/reject`, { decisionNote })),
};

export default bookingService;
