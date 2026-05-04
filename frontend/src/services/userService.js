import apiClient from './apiClient.js';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

const userService = {
  getAll: async (params = {}) => unwrap(await apiClient.get('/users', { params })),
  getMe: async () => unwrap(await apiClient.get('/users/me')),
};

export default userService;
