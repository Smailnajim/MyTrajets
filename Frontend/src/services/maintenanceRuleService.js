import api from './api';

// Get all maintenance rules
export const getAllMaintenanceRules = async () => {
    const response = await api.get('/maintenance-rules');
    return response.data;
};

// Create maintenance rule
export const createMaintenanceRule = async (ruleData) => {
    const response = await api.post('/Maintenance-rules', ruleData);
    return response.data;
};

// Update maintenance rule
export const updateMaintenanceRule = async (id, ruleData) => {
    const response = await api.patch(`/maintenance-rules/${id}`, ruleData);
    return response.data;
};

// Delete maintenance rule
export const deleteMaintenanceRule = async (id) => {
    const response = await api.delete(`/maintenance-rules/${id}`);
    return response.data;
};
