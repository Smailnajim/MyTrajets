import User from "../models/User";


export const createUser = async ({roleId, firstName, lastName, email, password, roleId }) => {
    const user = new User({ 
        roleId,
        firstName, 
        lastName,
        email, 
        password, 
    });

    return await user.save();
}