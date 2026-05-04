import client from './apiClient.js';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const login = async (data) => unwrap(await client.post('/auth/login', data));
export const register = async (data) => unwrap(await client.post('/auth/register', data));
export const logout = async () => unwrap(await client.post('/auth/logout'));
export const getMe = async () => unwrap(await client.get('/users/me'));
export const refresh = async () => unwrap(await client.post('/auth/refresh-token'));
