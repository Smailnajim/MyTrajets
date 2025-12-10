import User from "../models/User.js";


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

const findOneByEmail = async ({ email }) => {
    return await User.findOne({ email });
}

const findOneById = async ({ id }) => {
    return await User.findById(id);
}

const updateUserStatus = async ({ id, etat }) => {
    return await User.findByIdAndUpdate(id, { etat }, { new: true }).select('-password');
}

export default {
    createUser,
    findOneByEmail,
    findOneById,
    updateUserStatus
};