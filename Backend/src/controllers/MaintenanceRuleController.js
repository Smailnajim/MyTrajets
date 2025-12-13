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

/**
 * Get all maintenance rules
 * @route GET /api/maintenance-rules
 */
const getAllRules = tryCatch(async (req, res) => {
    const rules = await MaintenanceRuleService.getAllRules();
    return successHandler(res, 200, "Maintenance rules retrieved successfully", rules);
});

/**
 * Update a maintenance rule
 * @route PATCH /api/maintenance-rules/:id
 */
const updateRule = tryCatch(async (req, res) => {
    const { id } = req.params;
    const rule = await MaintenanceRuleService.updateRule(id, req.body);
    return successHandler(res, 200, "Maintenance rule updated successfully", rule);
});

/**
 * Delete a maintenance rule
 * @route DELETE /api/maintenance-rules/:id
 */
const deleteRule = tryCatch(async (req, res) => {
    const { id } = req.params;
    await MaintenanceRuleService.deleteRule(id);
    return successHandler(res, 200, "Maintenance rule deleted successfully");
});

export default {
    createRule,
    getAllRules,
    updateRule,
    deleteRule
};