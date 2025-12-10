import User from "../models/User.js";
import Users from "../repositories/Users.js";
import createError from "../utils/createError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import Roles from "../repositories/Roles.js";


const registerService = async ({ firstName, lastName, email, password, roleId }) => {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw createError("Email already registered", 409);
    }
    const chauffeurRole = await Roles.findOne({name: "chauffeur"});
    if (!chauffeurRole) {
        const role = await Roles.createRole({ name: "chauffeur" });
        if(!role){
            throw createError("Failed to create role", 500);
        }
        chauffeurRole = role;
    }
    const user = Users.createUser({ roleId: chauffeurRole._id, firstName, lastName, email, password})
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        etat: user.etat,
        createdAt: user.createdAt
    };
};

export default {
    registerService
};