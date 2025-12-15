import Role from "../models/Role.js";

// CREATE
const createRole = async (role) => {
    const newRole = new Role(role);
    return await newRole.save();
}

// READ
const findOne = async (role) => {
    return await Role.findOne(role);
}

const findOneById = async (id) => {
    return await Role.findById(id);
}

const findByName = async (name) => {
    return await Role.findOne({ name });
}

const findAll = async () => {
    return await Role.find();
}

const findAllWithFilters = async (filters = {}) => {
    return await Role.find(filters);
}

// UPDATE
const updateRole = async (id, updateData) => {
    return await Role.findByIdAndUpdate(id, updateData, { new: true });
}

const findOneAndUpdatePermissions = async (role, permissions) => {
    return await Role.findOneAndUpdate(
        { name: role },
        { permissions: permissions },
        { new: true }
    );
}

// DELETE
const deleteRole = async (id) => {
    return await Role.findByIdAndDelete(id);
}

const deleteByName = async (name) => {
    return await Role.findOneAndDelete({ name });
}

export default {
    createRole,
    findOne,
    findOneById,
    findByName,
    findAll,
    findAllWithFilters,
    updateRole,
    findOneAndUpdatePermissions,
    deleteRole,
    deleteByName
};