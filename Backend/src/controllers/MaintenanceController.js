import MaintenanceService from '../services/MaintenanceService.js';
import successHandler from '../utils/successHandler.js';
import tryCatch from '../middlewares/tryCatch.js';

const createMaintenance = tryCatch(async (req, res) => {
    const maintenance = await MaintenanceService.createMaintenance(req.body);
    return successHandler(res, 201, "Maintenance record created", maintenance);
});

const getAllMaintenances = tryCatch(async (req, res) => {
    const maintenances = await MaintenanceService.getAllMaintenances();
    return successHandler(res, 200, "Maintenance records retrieved", maintenances);
});

const getFleetStatus = tryCatch(async (req, res) => {
    const status = await MaintenanceService.getFleetStatus();
    return successHandler(res, 200, "Fleet maintenance status retrieved", status);
});

export default {
    createMaintenance,
    getAllMaintenances,
    getFleetStatus
};
