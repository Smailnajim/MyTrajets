import User from "../models/User";


const createUser = async ({roleId, firstName, lastName, email, password, roleId }) => {
    const user = new User({ 
        roleId,
        firstName, 
        lastName,
        email, 
        password, 
    });

    return await user.save();
}

const findOneByEmail = async ({email}) => {
    return await User.findOne({email});
}

const findOneById = async ({id}) => {
    return await User.findById(id);
}

export default {
    createUser,
    findOneByEmail,
    findOneById
};