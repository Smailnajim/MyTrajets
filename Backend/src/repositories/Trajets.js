import Trajet from "../models/Trajet.js";
import { Types } from "mongoose";

// CREATE
const createTrajet = async (trajet) => {
    const newTrajet = new Trajet(trajet);
    return await newTrajet.save();
}

// READ
const findOne = async (query) => {
    return await Trajet.findOne(query)
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findOneById = async (id) => {
    return await Trajet.findById(id)
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findAll = async () => {
    return await Trajet.find({})
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findAllWithFilters = async (filters = {}) => {
    return await Trajet.find(filters)
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findByChauffeur = async (chauffeurId) => {
    return await Trajet.find({ chauffeurId })
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findByCamion = async (camionId) => {
    return await Trajet.find({ camionId })
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findByStatus = async (statuts) => {
    return await Trajet.find({ statuts })
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const findAllWithPagination = async (limit = 10, page = 1, filters = {}) => {
    const skip = (page - 1) * limit;
    const trajets = await Trajet.find(filters)
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Trajet.countDocuments(filters);

    return {
        trajets,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        }
    };
}

// UPDATE
const updateTrajet = async (id, updateData) => {
    return await Trajet.findByIdAndUpdate(id, updateData, { new: true })
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const updateStatus = async (id, statuts) => {
    return await Trajet.findByIdAndUpdate(
        id,
        { statuts },
        { new: true }
    )
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

const updateArrival = async (id, arriveData) => {
    return await Trajet.findByIdAndUpdate(
        id,
        {
            'suiviDate.arrive': arriveData.date,
            'suiviGasoilML.arrive': arriveData.gasoil,
            'emplacement.arrive': arriveData.emplacement,
            'statuts': 'completed'
        },
        { new: true }
    )
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

// DELETE
const deleteTrajet = async (id) => {
    return await Trajet.findByIdAndDelete(id);
}

const deleteMany = async (filters) => {
    return await Trajet.deleteMany(filters);
}

// AGGREGATIONS
const getCamionKilometrage = async () => {
    return await Trajet.aggregate([
        { $match: { statuts: 'completed' } },
        {
            $group: {
                _id: '$camionId',
                totalKilometrage: { $sum: '$kilometrage' },
                trajetCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'vehicles',
                localField: '_id',
                foreignField: '_id',
                as: 'vehicle'
            }
        },
        {
            $project: {
                _id: 0,
                vehicleId: '$_id',
                plateNumber: '$vehicle.plateNumber',
                totalKilometrage: 1,
                trajetCount: 1
            }
        }
    ]);
}

const getRemorqueKilometrage = async () => {
    return await Trajet.aggregate([
        { $match: { statuts: 'completed', remorqueId: { $exists: true, $ne: null } } },
        {
            $group: {
                _id: '$remorqueId',
                totalKilometrage: { $sum: '$kilometrage' },
                trajetCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'vehicles',
                localField: '_id',
                foreignField: '_id',
                as: 'vehicle'
            }
        },
        { $unwind: '$vehicle' },
        {
            $project: {
                _id: 0,
                vehicleId: '$_id',
                plateNumber: '$vehicle.plateNumber',
                totalKilometrage: 1,
                trajetCount: 1
            }
        }
    ]);
}

const getCamionConsommation = async (camionId) => {
    return await Trajet.aggregate([
        {
            $match: {
                camionId: new Types.ObjectId(camionId),
                statuts: 'completed'
            }
        },
        {
            $group: {
                _id: '$camionId',
                totalConsommation: {
                    $sum: { $subtract: ['$suiviGasoilML.depart', '$suiviGasoilML.arrive'] }
                },
                totalKilometrage: { $sum: '$kilometrage' },
                trajetCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'vehicles',
                localField: '_id',
                foreignField: '_id',
                as: 'camion'
            }
        },
        { $unwind: '$camion' },
        {
            $project: {
                _id: 0,
                vehicleId: '$_id',
                plateNumber: '$vehicle.plateNumber',
                totalConsommation: 1,
                totalKilometrage: 1,
                trajetCount: 1,
                averageConsumptionPer100Km: {
                    $cond: [
                        { $eq: ['$totalKilometrage', 0] },
                        0,
                        { $multiply: [{ $divide: ['$totalConsommation', '$totalKilometrage'] }, 100] }
                    ]
                }
            }
        }
    ]);
}

const findNotStarted = async () => {
    return await Trajet.find({
        statuts: { $nin: ['in_progress', 'completed'] },
        'suiviDate.depart': { $lt: new Date() }
    })
        .populate('chauffeurId', 'firstName lastName email')
        .populate('camionId')
        .populate('remorqueId');
}

export default {
    createTrajet,
    findOne,
    findOneById,
    findAll,
    findAllWithFilters,
    findByChauffeur,
    findByCamion,
    findByStatus,
    findAllWithPagination,
    updateTrajet,
    updateStatus,
    updateArrival,
    deleteTrajet,
    deleteMany,
    getCamionKilometrage,
    getRemorqueKilometrage,
    getCamionConsommation,
    findNotStarted
};
