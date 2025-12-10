import Maintenance from "../models/Maintenance.js";

// CREATE
const createMaintenance = async ({ vehicleId, description, suiviDate, coutDH }) => {
    const maintenance = new Maintenance({
        vehicleId,
        description,
        suiviDate,
        coutDH
    });
    return await maintenance.save();
}

// READ
const findAll = async () => {
    return await Maintenance.find().populate('vehicleId');
}

const findOneById = async (id) => {
    return await Maintenance.findById(id).populate('vehicleId');
}

const findByVehicleId = async (vehicleId) => {
    return await Maintenance.find({ vehicleId }).populate('vehicleId');
}

const findAllWithFilters = async (filters = {}) => {
    return await Maintenance.find(filters).populate('vehicleId');
}

// UPDATE
const updateMaintenance = async (id, updateData) => {
    return await Maintenance.findByIdAndUpdate(id, updateData, { new: true }).populate('vehicleId');
}

const updateSuiviDate = async (id, suiviDate) => {
    return await Maintenance.findByIdAndUpdate(
        id,
        { suiviDate },
        { new: true }
    ).populate('vehicleId');
}

// DELETE
const deleteMaintenance = async (id) => {
    return await Maintenance.findByIdAndDelete(id);
}

const deleteByVehicleId = async (vehicleId) => {
    return await Maintenance.deleteMany({ vehicleId });
}

export default {
    createMaintenance,
    findAll,
    findOneById,
    findByVehicleId,
    findAllWithFilters,
    updateMaintenance,
    updateSuiviDate,
    deleteMaintenance,
    deleteByVehicleId
};
