import apiClient from './apiClient.js';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

const resourceService = {
  getAll: async (params = {}) => unwrap(await apiClient.get('/resources', { params })),
  getById: async (id) => unwrap(await apiClient.get(`/resources/${id}`)),
  create: async (data) => unwrap(await apiClient.post('/resources', data)),
  update: async (id, data) => unwrap(await apiClient.put(`/resources/${id}`, data)),
  delete: async (id) => unwrap(await apiClient.delete(`/resources/${id}`)),
};

export default resourceService;
