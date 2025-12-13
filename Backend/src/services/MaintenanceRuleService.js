import MaintenanceRules from '../repositories/MaintenanceRules.js';
import createError from '../utils/createError.js';

/**
 * Create a new maintenance rule
 * @param {Object} ruleData 
 * @returns {Promise<Object>}
 */
const createRule = async (ruleData) => {
    checkIfRedundant(ruleData.type, ruleData.vehicleType);
    return await MaintenanceRules.createRule(ruleData);
};

const getAllRules = async () => {
    return await MaintenanceRules.findAll();
};

const updateRule = async (id, updateData) => {
    const rule = await MaintenanceRules.findById(id);
    if (!rule) throw createError('Rule not found', 404);
    checkIfRedundant(rule.type, rule.vehicleType);
    return await MaintenanceRules.updateRule(id, updateData);
};

const deleteRule = async (id) => {
    const rule = await MaintenanceRules.findById(id);
    if (!rule) throw createError('Rule not found', 404);
    return await MaintenanceRules.deleteRule(id);
};

const checkIfRedundant = async (type, vehicleType) => {
    // Check if rule already exists for this type and vehicleType
    const existingRule = await MaintenanceRules.findByType(type, vehicleType);
    if (existingRule) {
        throw createError(`Rule for ${ruleData.type} on ${ruleData.vehicleType} already exists`, 409);
    }
}
export default {
    createRule,
    getAllRules,
    updateRule,
    deleteRule
};