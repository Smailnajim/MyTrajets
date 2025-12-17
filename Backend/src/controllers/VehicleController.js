import tryCatch from "../middlewares/tryCatch.js"
import VehicleService from "../services/VehicleService.js";
import successHandler from "../utils/successHandler.js";

/**
 * Create a new vehicle
 * @route POST /api/vehicles
 */
const createVehicle = tryCatch(async (req, res, next) => {
    const vehicle = await VehicleService.createVehicle(req.body);
    successHandler(res, 201, "Vehicle created successfully", vehicle);
});

/**
 * Get all vehicles
 * @route GET /api/vehicles
 */
const getAllVehicles = tryCatch(async (req, res, next) => {
    const { type, status } = req.query;
    const filters = {};
    if (type) filters.type = type;
    if (status) filters.status = status;
    const vehicles = await VehicleService.getAllVehicles(filters);
    successHandler(res, 200, "Vehicles fetched successfully", vehicles);
});

/**
 * Get vehicle by ID
 * @route GET /api/vehicles/:id
 */
const getVehicleById = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const vehicle = await VehicleService.getVehicleById(id);
    successHandler(res, 200, "Vehicle fetched successfully", vehicle);
});

/**
 * Add pneu to vehicle
 * @route POST /api/vehicles/:id/pneus
 */
const addPneuToVehicle = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const vehicle = await VehicleService.addPneuToVehicle(id, req.body);
    successHandler(res, 201, "Pneu added to vehicle successfully", vehicle);
});

/**
 * Get total kilometrage for spicifique vehicle's pneus by _id 
 * @route GET /api/vehicle/:id/kilometrage 
 */
const getVehicle_s_PneusKilometrage = tryCatch(async (req, res, next) => {
    const { id: vehicleId } = req.params;
    const pneus = await VehicleService.getVehicle_s_PneusKilometrage(vehicleId);
    successHandler(res, 200, "select kilometrage for vehicl's pneus By successfully", pneus);
});

/**
 * Update a vehicle
 * @route PATCH /api/vehicles/:id
 */
const updateVehicle = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const vehicle = await VehicleService.updateVehicle(id, req.body);
    successHandler(res, 200, "Vehicle updated successfully", vehicle);
});

/**
 * Delete a vehicle
 * @route DELETE /api/vehicles/:id
 */
const deleteVehicle = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    await VehicleService.deleteVehicle(id);
    successHandler(res, 200, "Vehicle deleted successfully");
});

export default {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    addPneuToVehicle,
    getVehicle_s_PneusKilometrage,
    updateVehicle,
    deleteVehicle
}