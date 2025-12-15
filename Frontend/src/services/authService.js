import api from './api';

export const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    const { user, accessToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, accessToken };
};

export const register = async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
};

export const refreshToken = async () => {
    const response = await api.post('/users/refresh-token');
    const { accessToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
};
