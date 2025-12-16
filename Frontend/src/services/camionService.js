import api from './api';

// Create a new camion (vehicle)
export const createCamion = async (camionData) => {
    const payload = {
        type: 'camion',
        status: 'available',
        ...camionData,
    };

    const response = await api.post('/vehicles', payload);
    return response.data;
};

// Fetch camions list (optional helper if needed elsewhere)
export const getCamions = async (params = {}) => {
    const response = await api.get('/vehicles', { params: { type: 'camion', ...params } });
    return response.data;
};
