import Trajets from "../repositories/Trajets.js";

/**
 * Get all trajets using a filter
 * admin: can filter from all trajets
 * chauffeur: can filter from just his trajets
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
const getAllTrajets = async (filters = {}) => {
    return await Trajets.findAllWithFilters(filters);
};

/**
 * Get total kilometrage for each camion
 * @returns {Promise<Array>}
 */
const getCamionKilometrage = async () => {
    return await Trajets.getCamionKilometrage();
};

export default {
    getAllTrajets,
    getCamionKilometrage
};