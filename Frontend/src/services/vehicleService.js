import api from './api.js';

// Get all vehicles
export const getAllVehicles = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/vehicles${params ? `?${params}` : ''}`);
    return response.data;
};

// Create a new vehicle
export const createVehicle = async (vehicleData) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
};

// Get vehicles by type
export const getVehiclesByType = async (type) => {
    const response = await api.get(`/vehicles?type=${type}`);
    return response.data;
};
