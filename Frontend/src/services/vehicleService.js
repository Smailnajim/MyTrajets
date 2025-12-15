import api from './api.js';

// Get all vehicles
export const getAllVehicles = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/vehicles${params ? `?${params}` : ''}`);
    return response.data;
};

// Get vehicle by ID
export const getVehicleById = async (vehicleId) => {
    const response = await api.get(`/vehicles/${vehicleId}`);
    return response.data;
};

// Create a new vehicle
export const createVehicle = async (vehicleData) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
};

// Add pneu to vehicle
export const addPneuToVehicle = async (vehicleId, pneuData) => {
    const response = await api.post(`/vehicles/${vehicleId}/pneus`, pneuData);
    return response.data;
};

// Get vehicles by type
export const getVehiclesByType = async (type) => {
    const response = await api.get(`/vehicles?type=${type}`);
    return response.data;
};
