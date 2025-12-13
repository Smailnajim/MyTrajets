import MaintenanceRuleService from '../services/MaintenanceRuleService.js';
import successHandler from '../utils/successHandler.js';
import tryCatch from '../middlewares/tryCatch.js';

/**
 * Create a new maintenance rule
 * @route POST /api/maintenance-rules
 */
const createRule = tryCatch(async (req, res) => {
    const rule = await MaintenanceRuleService.createRule(req.body);
    return successHandler(res, 201, "Maintenance rule created successfully", rule);
});

export default {
    createRule,
};