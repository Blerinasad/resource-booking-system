import axios from 'axios'

// baseURL = /api  →  Vite proxy forwards to localhost:5000/api
// API Gateway listens on /api/* and routes to microservices
const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default client
