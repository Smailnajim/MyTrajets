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
 * Get vehicle by ID
 * @param {String} vehicleId
 * @returns {Promise<Object>}
 */
const getVehicleById = async (vehicleId) => {
    const vehicle = await Vehicles.findOneById(vehicleId);
    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }
    return vehicle;
};

/**
 * Add a pneu to vehicle
 * @param {String} vehicleId
 * @param {Object} pneuData
 * @returns {Promise<Object>}
 */
const addPneuToVehicle = async (vehicleId, pneuData) => {
    const vehicle = await Vehicles.findOneById(vehicleId);
    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }
    // Check for duplicate serial number
    const existingPneu = vehicle.pneus.find(p => p.serialNumber === pneuData.serialNumber);
    if (existingPneu) {
        throw createError("Pneu with this serial number already exists on this vehicle", 409);
    }
    return await Vehicles.addPneu(vehicleId, pneuData);
};

/**
 * get a Vehicle's pneus using id
 * @param {String} vehicleId
 * @returns {Promise<Array>}
 */
const getVehicle_s_PneusKilometrage = async (vehicleId) => {
    return await Vehicles.getVehicle_s_PneusKilometrage(vehicleId);
}

/**
 * Update a vehicle
 * @param {String} vehicleId
 * @param {Object} updateData
 * @returns {Promise<Object>}
 */
const updateVehicle = async (vehicleId, updateData) => {
    const vehicle = await Vehicles.findOneById(vehicleId);
    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }
    return await Vehicles.updateVehicle(vehicleId, updateData);
}

/**
 * Delete a vehicle
 * @param {String} vehicleId
 * @returns {Promise<Object>}
 */
const deleteVehicle = async (vehicleId) => {
    const vehicle = await Vehicles.findOneById(vehicleId);
    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }
    return await Vehicles.deleteVehicle(vehicleId);
}

export default {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    addPneuToVehicle,
    getVehicle_s_PneusKilometrage,
    updateVehicle,
    deleteVehicle
}