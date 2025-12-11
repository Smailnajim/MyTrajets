import Trajets from "../repositories/Trajets.js";
import Vehicles from "../repositories/Vehicles.js"

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

/**
 * Get total kilometrage for each remorque
 * @returns {Promise<Array>}
 */
const getRemorqueKilometrage = async () => {
    return await Trajets.getRemorqueKilometrage();
};

/**
 * Get total kilometrage for each Pneu
 * @returns {Promise<Array>}
 */
const getPneuKilometrage = async () => {
    return await Vehicles.getPneuKilometrageWithItsVehicles();
}

/**
 * get all Trajets
 * @returns {Promise<Array>}
 */
const allTrajets = async () => {
    return await Trajets.findAll();
};

export default {
    getAllTrajets,
    getCamionKilometrage,
    getRemorqueKilometrage,
    allTrajets,
    getPneuKilometrage
};