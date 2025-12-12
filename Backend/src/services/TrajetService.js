import Trajets from "../repositories/Trajets.js";
import Vehicles from "../repositories/Vehicles.js"
import createError from "../utils/createError.js";

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
/**
 * get a Trajet by id
 * @param {string} trajetId
 * @returns {Promise<Array>}
 */
const getTrajet = async (trajetId, user) => {
    const trajet = await Trajets.findOneById();
    if(!trajet) throw createError(`There is no one has this is ${trajetId}`, 404);
    
    const roleName = user.roleId?.name?.toLowerCase();
    if (roleName == 'chauffeur') {
        if (trajet.chauffeurId?._id.toString() !== user._id.toString()) {
            throw createError("You are not authorized to view this trajet", 403);
        }
    }

    return trajet;
};

export default {
    getAllTrajets,
    getCamionKilometrage,
    getRemorqueKilometrage,
    allTrajets,
    getTrajet,
    getPneuKilometrage
};