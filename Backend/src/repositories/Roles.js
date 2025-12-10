import Role from "../models/Role.js";

const createRole = async (role) => {
    const newRole = new Role(role);
    return await newRole.save();
}
const findOne = async (role) => {
    return await Role.findOne(role);
}
export default {
    createRole,
    findOne
};