import client from './apiClient.js'

// ── Booking Service ─────────────────────────────────
export const bookingService = {
  getAll:    (params) => client.get('/bookings', { params }),
  getById:   (id)     => client.get(`/bookings/${id}`),
  create:    (data)   => client.post('/bookings', data),
  cancel:    (id)     => client.patch(`/bookings/${id}/cancel`),
  approve:   (id)     => client.patch(`/admin/bookings/${id}/approve`),
  reject:    (id)     => client.patch(`/admin/bookings/${id}/reject`),
  adminAll:  (p)      => client.get('/admin/bookings', { params: p }),
}

// ── Resource Service ────────────────────────────────
export const resourceService = {
  getAll:    (params) => client.get('/resources', { params }),
  getById:   (id)     => client.get(`/resources/${id}`),
  create:    (data)   => client.post('/resources', data),
  update:    (id, d)  => client.put(`/resources/${id}`, d),
  delete:    (id)     => client.delete(`/resources/${id}`),
  availability: (id, p) => client.get(`/resources/${id}/availability`, { params: p }),
}

// ── Analytics Service ───────────────────────────────
export const analyticsService = {
  summary:       () => client.get('/analytics/summary'),
  mostUsed:      () => client.get('/analytics/most-used-resources'),
  topUsers:      () => client.get('/analytics/top-users'),
  byDay:         () => client.get('/analytics/bookings-by-day'),
  peakHours:     () => client.get('/analytics/peak-hours'),
}

// ── User Service ────────────────────────────────────
export const userService = {
  getAll:    (params) => client.get('/users', { params }),
  getById:   (id)     => client.get(`/users/${id}`),
  update:    (id, d)  => client.put(`/users/${id}`, d),
  delete:    (id)     => client.delete(`/users/${id}`),
}
