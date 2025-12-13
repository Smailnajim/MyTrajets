import Maintenances from '../repositories/Maintenances.js';
import MaintenanceRules from '../repositories/MaintenanceRules.js';
import createError from '../utils/createError.js';
import Vehicles from '../repositories/Vehicles.js';

const createMaintenance = async (data) => {
    return await Maintenances.createMaintenance(data);
};

const getAllMaintenances = async () => {
    return await Maintenances.findAll();
};

const getMaintenanceById = async (id) => {
    const maintenance = await Maintenances.findById(id);
    if (!maintenance) throw createError('Maintenance record not found', 404);
    return maintenance;
};

const updateMaintenance = async (id, data) => {
    const maintenance = await Maintenances.findById(id);
    if (!maintenance) throw createError('Maintenance record not found', 404);
    return await Maintenances.update(id, data);
};

const deleteMaintenance = async (id) => {
    const maintenance = await Maintenances.findById(id);
    if (!maintenance) throw createError('Maintenance record not found', 404);
    return await Maintenances.remove(id);
};

/**
 * Check maintenance status for a specific vehicle
 * @param {String} vehicleId 
 */
const checkVehicleStatus = async (vehicleId) => {
    const vehicle = await Vehicles.findOneById(vehicleId);
    if (!vehicle) return;

    const relevantRules = await MaintenanceRules.findByVehicleType(vehicle.type);
console.log(relevantRules);//tynxpe
    const statusReport = [];

    for (const rule of relevantRules){
        // Get last maintenance of this type
        const lastMaintenance = await Maintenances.findLatestByVehicleAndType(vehicleId, rule.type);

        let lastKm = 0;
        if (lastMaintenance) {
            lastKm = lastMaintenance?.kmAtMaintenance;
        }

        const currentKm = vehicle?.kilometrageTotal || 0;
        const distanceSince = currentKm - lastKm;
        const remaining = rule.intervalKm - distanceSince;

        let status = 'good'; //green
        if (remaining <= 0) {
            status = 'overdue'; //red
        } else if (remaining <= rule.intervalKm * 0.1) {
            status = 'warning'; //orange
        }

        statusReport.push({
            ruleType: rule.type,
            ruleInterval: rule.intervalKm,
            lastMaintenanceKm: lastKm,
            currentKm: currentKm,
            distanceSince: distanceSince,
            status: status
        });
    }

    return {
        vehicle: {
            id: vehicle._id,
            plateNumber: vehicle.plateNumber,
            type: vehicle.type
        },
        report: statusReport
    };
};

/**
 * Get status for the entire fleet
 */
const getFleetStatus = async () => {
    const vehicles = await Vehicles.findAll();
    const fleetReport = [];

    for (const vehicle of vehicles) {
        const report = await checkVehicleStatus(vehicle._id);
        fleetReport.push(report);
    }
    return fleetReport;
};

export default {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
    checkVehicleStatus,
    getFleetStatus
};
