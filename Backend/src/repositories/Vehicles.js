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
    updateVehicle,
    updateStatus,
    updatePosition,
    updateKilometrage,
    deleteVehicle,
    deleteByPlateNumber,
    deleteMany
};
