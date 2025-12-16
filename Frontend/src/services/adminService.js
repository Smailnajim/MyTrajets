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

// Change user role
export const changeUserRole = async (userId, roleId) => {
    const response = await api.patch(`/users/${userId}/role`, { roleId });
    return response.data;
};

// Get all roles
export const getAllRoles = async () => {
    const response = await api.get('/roles');
    return response.data;
};

// Sync permissions for roles
export const syncPermissions = async () => {
    const response = await api.post('/roles/sync-permissions');
    return response.data;
};
