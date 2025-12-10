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

export default {
    createUser,
};