import User from "../models/User.js";
import { createUser } from "../repositories/Users.js";
import createError from "../utils/createError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import Role from "../models/Role";


export const registerService = async ({ firstName, lastName, email, password, roleId }) => {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw createError("Email already registered", 409);
    }
    const chauffeurRole = await Role.findOne({name: "chauffeur"});
    if (chauffeurRole) {
        // throw createError("there is no role has name chauffeur", 409);
        //must add gestion to create the role if not exist; but not now!
    }
    const user = createUser({ roleId: chauffeurRole._id, firstName, lastName, email, password})
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        etat: user.etat,
        createdAt: user.createdAt
    };
    return {
        userResponse,
        accessToken,
        refreshToken
    }
};