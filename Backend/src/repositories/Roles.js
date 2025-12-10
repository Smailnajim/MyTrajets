import Role from "../models/Role.js";

const createRole = async (role) => {
    const newRole = new Role(role);
    return await newRole.save();
}
const findOne = async (role) => {
    return await Role.findOne(role);
}
const findOneAndUpdatePermissions = async (role, permissions) => {
    return await Role.findOneAndUpdate(
        { name: role },
        { permissions: permissions },
        { new: true }
    );
}
export default {
    createRole,
    findOne,
    findOneAndUpdate
};