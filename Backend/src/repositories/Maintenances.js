import Maintenance from '../models/Maintenance.js';

// CREATE
const createMaintenance = async (data) => {
    const maintenance = new Maintenance(data);
    return await maintenance.save();
};

// READ
const findAll = async () => {
    return await Maintenance.find()
        .populate('vehicleId', 'plateNumber type status');
};

const findById = async (id) => {
    return await Maintenance.findById(id).populate('vehicleId');
};

const findLatestByVehicleAndType = async (vehicleId, type) => {
    return await Maintenance.findOne({ vehicleId, type })
        .sort({ 'suiviDate.dateFin': -1 }) // Get the most recent one
        .limit(1);
};

const findByVehicle = async (vehicleId) => {
    return await Maintenance.find({ vehicleId })
        .populate('vehicleId', 'plateNumber type status')
        .sort({ 'suiviDate.dateDebut': -1 });
};

// UPDATE
const update = async (id, data) => {
    return await Maintenance.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
const remove = async (id) => {
    return await Maintenance.findByIdAndDelete(id);
};

export default {
    createMaintenance,
    findAll,
    findById,
    findLatestByVehicleAndType,
    findByVehicle,
    update,
    remove
};
