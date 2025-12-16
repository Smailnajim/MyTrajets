import api from './api';

// Get all maintenances
export const getAllMaintenances = async () => {
    const response = await api.get('/maintenances');
    return response.data;
};

// Create maintenance
export const createMaintenance = async (data) => {
    const response = await api.post('/maintenances', data);
    return response.data;
};

// Update maintenance
export const updateMaintenance = async (id, data) => {
    const response = await api.patch(`/maintenances/${id}`, data);
    return response.data;
};

// Get fleet maintenance status (alerts)
export const getFleetMaintenanceStatus = async () => {
    const response = await api.get('/maintenance/alerts');
    return response.data;
};
