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

export default {
    getAllTrajets
};