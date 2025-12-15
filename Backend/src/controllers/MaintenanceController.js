import MaintenanceService from '../services/MaintenanceService.js';
import successHandler from '../utils/successHandler.js';
import tryCatch from '../middlewares/tryCatch.js';
import { matchedData } from 'express-validator';

const createMaintenance = tryCatch(async (req, res) => {
    const data = matchedData(req);
    const maintenance = await MaintenanceService.createMaintenance(data);
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

const updateMaintenance = tryCatch(async (req, res) => {
    const { id } = req.params;
    const data = matchedData(req);
    const maintenance = await MaintenanceService.updateMaintenance(id, data);
    return successHandler(res, 200, "Maintenance record updated", maintenance);
});

export default {
    createMaintenance,
    getAllMaintenances,
    getFleetStatus,
    updateMaintenance
};
