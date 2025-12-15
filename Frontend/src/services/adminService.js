import api from './api';

// Get all users (pending and approved)
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

// Accept/authorize a user
export const acceptUser = async (userId) => {
    const response = await api.patch(`/users/${userId}/accept`);
    return response.data;
};

// Sync permissions for roles
export const syncPermissions = async () => {
    const response = await api.post('/roles/sync-permissions');
    return response.data;
};
