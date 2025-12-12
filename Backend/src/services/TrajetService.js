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
    if (!trajet) throw createError(`There is no one has this is ${trajetId}`, 404);

    const roleName = user.roleId?.name?.toLowerCase();
    if (roleName == 'chauffeur') {
        if (trajet.chauffeurId?._id.toString() !== user._id.toString()) {
            throw createError("You are not authorized to view this trajet", 403);
        }
    }

    return trajet;
};

/**
 * get Consommation by camion id 
 * @param {string} camionId
 * @returns {Promise<Array>}
 */
const getCamionConsommation = async (camionId) => {
    const result = await Trajets.getCamionConsommation(camionId);
    if (!result || result.length === 0) {
        throw createError(`No consumption data found for camion with id ${camionId}`, 404);
    }
    return result[0];
};


/**
 * 
 * @param {String} camionId 
 * @param {String} trajetId 
 * @param {Object} user 
 * @returns {Promise<Object>}
 */
const getTrajetConsommation = async (camionId, trajetId, user = null) => {
    const trajet = await Trajets.findOne({ _id: trajetId, camionId: camionId });
    if (!trajet) throw createError(`Trajet ${trajetId} not found for camion ${camionId}`, 404);

    const roleName = user?.roleId?.name.toLowerCase();
    console.log(roleName, "...trajet\n",);
    if (roleName == "chauffeur") {
        if (trajet.chauffeurId._id.toString() != user?.roleId?._id.toString())
            throw createError('this trajet assignd to another chauffeur', 403);
    }
    return { consommation: trajet.consommation };
};

/**
 * Create a new trajet
 * @param {Object} trajetData
 * @returns {Promise<Object>}
 */
const createTrajet = async (trajetData) => {
    return await Trajets.createTrajet(trajetData);
};
/**
 * Create a new trajet
 * @param {Object} trajetData
 * @returns {Promise<Object>}
 */
const updateTrajet = async (trajetData) => {
    const { id, ...dataToUpd} = trajetData;
    return await Trajets.updateTrajet(id, dataToUpd);
};

export default {
    getAllTrajets,
    getCamionKilometrage,
    getRemorqueKilometrage,
    allTrajets,
    getTrajet,
    getPneuKilometrage,
    getCamionConsommation,
    getTrajetConsommation,
    updateTrajet,
    createTrajet
};