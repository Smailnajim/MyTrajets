import MaintenanceRule from '../models/MaintenanceRule.js';

// CREATE
const createRule = async (ruleData) => {
    const newRule = new MaintenanceRule(ruleData);
    return await newRule.save();
};

// READ
const findAll = async () => {
    return await MaintenanceRule.find();
};

const findById = async (id) => {
    return await MaintenanceRule.findById(id);
};

const findByType = async (type, vehicleType) => {
    return await MaintenanceRule.findOne({ type, vehicleType });
};

// UPDATE
const updateRule = async (id, updateData) => {
    return await MaintenanceRule.findByIdAndUpdate(id, updateData, { new: true });
};

// DELETE
const deleteRule = async (id) => {
    return await MaintenanceRule.findByIdAndDelete(id);
};
export default {
    createRule,
    findAll,
    findById,
    findByType,
    updateRule,
    deleteRule
};