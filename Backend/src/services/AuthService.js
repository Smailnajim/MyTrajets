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

const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if(!user){
        throw createError("Invalid email or password", 401);
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw createError("Invalid email or password", 401);
    }

    if(user.etat !== "authorise"){
        throw createError("Account is not active. Please wait for admin approval", 403);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        etat: user.etat
    };

    return {
        userResponse,
        accessToken,
        refreshToken
    };
};

export default {
    registerService,
    loginService
};