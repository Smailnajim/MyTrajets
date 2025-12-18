import User from "../models/User.js";

// CREATE
const createUser = async ({ roleId, firstName, lastName, email, password }) => {
    const user = new User({
        roleId,
        firstName,
        lastName,
        email,
        password,
    });
    return await user.save();
}

// READ
const findOneByEmail = async ({ email }) => {
    return await User.findOne({ email });
}

const findOneById = async (id) => {
    return await User.findById(id)
    .populate("roleId");
}

const findAll = async () => {
    return await User.find().select('-password');
}

const findAllWithFilters = async (filters = {}) => {
    return await User.find(filters).select('-password').populate('roleId', 'name');
}

const findOneByIdWithRole = async (id) => {
    return await User.findById(id).populate('roleId', 'name permissions');
}

// UPDATE
const updateUserStatus = async ({ id, etat }) => {
    return await User.findByIdAndUpdate(id, { etat }, { new: true }).select('-password');
}

const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
}

const updatePassword = async (id, password) => {
    const user = await User.findById(id);
    if (user) {
        user.password = password;
        await user.save();
    }
    return user;
}

// DELETE
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

export default {
    createUser,
    findOneByEmail,
    findOneById,
    findOneByIdWithRole,
    findAll,
    findAllWithFilters,
    updateUserStatus,
    updateUser,
    updatePassword,
    deleteUser
};