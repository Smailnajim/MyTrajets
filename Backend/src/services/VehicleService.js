import Vehicles from "../repositories/Vehicles.js";
import createError from "../utils/createError.js";


/**
 * Create a new vehicle
 * @param {Object} vehicleData
 * @returns {Promise<Object>}
 */
const createVehicle = async (vehicleData) => {
    const existing = await Vehicles.findByPlateNumber(vehicleData.plateNumber);
    if (existing) {
        throw createError("Vehicle with this plate number already exists", 409);
    }
    return await Vehicles.createVehicle(vehicleData);
};

/**
 * Get all vehicles
 * @returns {Promise<Array>}
 */
const getAllVehicles = async (filters = {}) => {
    return await Vehicles.findAllWithFilters(filters);
};

/**
 * get a Vehicle's pneus using id
 * @param {String} vehicleId
 * @returns {Promise<Array>}
 */
const getVehicle_s_PneusKilometrage = async (vehicleId) => {
    return await Vehicles.getVehicle_s_PneusKilometrage(vehicleId);
}

export default {
    createVehicle,
    getAllVehicles,
    getVehicle_s_PneusKilometrage
}