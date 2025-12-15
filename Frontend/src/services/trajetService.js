import api from './api';

// Get all trajets
export const getAllTrajets = async () => {
    const response = await api.get('/trajets');
    return response.data;
};

// Get single trajet
export const getTrajet = async (id) => {
    const response = await api.get(`/trajets/${id}`);
    return response.data;
};

// Get trajets by status
export const getTrajetsByStatus = async (status) => {
    const response = await api.get(`/trajets/status/${status}`);
    return response.data;
};

// Get not started trajets
export const getTrajetsNotStarted = async () => {
    const response = await api.get('/trajets/not-started');
    return response.data;
};

// Create new trajet
export const createTrajet = async (trajetData) => {
    const response = await api.post('/trajets', trajetData);
    return response.data;
};

// Update trajet
export const updateTrajet = async (id, trajetData) => {
    const response = await api.patch(`/trajets/${id}`, trajetData);
    return response.data;
};

// Get chauffeur's trajets
export const getChauffeurTrajets = async (userId) => {
    const response = await api.get(`/users/${userId}/trajets`);
    return response.data;
};

// Get my trajets (for chauffeur)
export const getMyTrajets = async () => {
    const response = await api.get('/users/trajets');
    return response.data;
};
