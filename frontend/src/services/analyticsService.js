import apiClient from './apiClient.js';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

const analyticsService = {
  summary: async () => unwrap(await apiClient.get('/analytics/summary')),
  mostUsedResources: async () => unwrap(await apiClient.get('/analytics/most-used-resources')),
  topUsers: async () => unwrap(await apiClient.get('/analytics/top-users')),
  bookingsByDay: async () => unwrap(await apiClient.get('/analytics/bookings-by-day')),
  peakHours: async () => unwrap(await apiClient.get('/analytics/peak-hours')),
};

export default analyticsService;
