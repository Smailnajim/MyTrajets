import Vehicle from "../models/Vehicle.js";

// CREATE
const createVehicle = async (vehicle) => {
    const newVehicle = new Vehicle(vehicle);
    return await newVehicle.save();
}

// READ
const findOne = async (query) => {
    return await Vehicle.findOne(query);
}

const findOneById = async (id) => {
    return await Vehicle.findById(id);
}

const findByPlateNumber = async (plateNumber) => {
    return await Vehicle.findOne({ plateNumber });
}

const findAll = async () => {
    return await Vehicle.find();
}

const findAllWithFilters = async (filters = {}) => {
    return await Vehicle.find(filters);
}

const findByType = async (type) => {
    return await Vehicle.find({ type });
}

const findByStatus = async (status) => {
    return await Vehicle.find({ status });
}

const findAvailable = async () => {
    return await Vehicle.find({ status: 'available' });
}

const findAllWithPagination = async (limit = 10, page = 1, filters = {}) => {
    const skip = (page - 1) * limit;
    const vehicles = await Vehicle.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Vehicle.countDocuments(filters);

    return {
        vehicles,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        }
    };
}

const getPneuKilometrageWithItsVehicles = async () => {
    return await Vehicle.find({}, {_id: 1, pneus: 1});
    
}

const getVehicle_s_PneusKilometrage = async (vehicleId) => {
    return await Vehicle.findById(vehicleId, {_id: 1, pneus: 1})
}

// UPDATE
const updateVehicle = async (id, updateData) => {
    return await Vehicle.findByIdAndUpdate(id, updateData, { new: true });
}

const updateStatus = async (id, status) => {
    return await Vehicle.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
}

const updatePosition = async (id, position) => {
    return await Vehicle.findByIdAndUpdate(
        id,
        { position },
        { new: true }
    );
}

const updateKilometrage = async (id, kilometrageActuel) => {
    return await Vehicle.findByIdAndUpdate(
        id,
        { kilometrageActuel },
        { new: true }
    );
}

const updatePneus = async (id, pneus) => {
    return await Vehicle.findByIdAndUpdate(
        id,
        { pneus },
        { new: true }
    );
}

const addPneu = async (id, pneu) => {
    return await Vehicle.findByIdAndUpdate(
        id,
        { $push: { pneus: pneu } },
        { new: true }
    );
}

const updatePneuBySerial = async (vehicleId, serialNumber, updateData) => {
    return await Vehicle.findOneAndUpdate(
        { _id: vehicleId, 'pneus.serialNumber': serialNumber },
        { $set: { 'pneus.$': { ...updateData, serialNumber } } },
        { new: true }
    );
}

const removePneu = async (vehicleId, serialNumber) => {
    return await Vehicle.findByIdAndUpdate(
        vehicleId,
        { $pull: { pneus: { serialNumber } } },
        { new: true }
    );
}

const getVehiclesByPneuSerialNumber = async (serialNumber) => {
    return await Vehicle.find({ "pneus.serialNumber": serialNumber });
}//i can use findAllWithFilters too, for get all cars those have a pneu spisifique

// DELETE
const deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndDelete(id);
}

const deleteByPlateNumber = async (plateNumber) => {
    return await Vehicle.findOneAndDelete({ plateNumber });
}

const deleteMany = async (filters) => {
    return await Vehicle.deleteMany(filters);
}

export default {
    createVehicle,
    findOne,
    findOneById,
    findByPlateNumber,
    findAll,
    findAllWithFilters,
    findByType,
    findByStatus,
    findAvailable,
    findAllWithPagination,
    getPneuKilometrageWithItsVehicles,
    getVehicle_s_PneusKilometrage,
    updateVehicle,
    updateStatus,
    updatePosition,
    updateKilometrage,
    updatePneus,
    addPneu,
    updatePneuBySerial,
    removePneu,
    deleteVehicle,
    deleteByPlateNumber,
    deleteMany
};
