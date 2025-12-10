import User from "../models/User.js";
import Users from "../repositories/Users.js";
import createError from "../utils/createError.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js";
import Roles from "../repositories/Roles.js";


const registerService = async ({ firstName, lastName, email, password, roleId }) => {
    const existingUser = await Users.findOneByEmail({ email });
    if (existingUser) {
        throw createError("Email already registered", 409);
    }
    let chauffeurRole = await Roles.findOne({name: "chauffeur"});
    if (!chauffeurRole) {
        const role = await Roles.createRole({ name: "chauffeur" });
        if(!role){
            throw createError("Failed to create role", 500);
        }
        chauffeurRole = role;
    }
    const user = await Users.createUser({ roleId: chauffeurRole._id, firstName, lastName, email, password})
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
    const user = await Users.findOneByEmail({ email });
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

const refreshTokenService = async (refreshToken) => {
    if(!refreshToken){
        throw createError("Refresh token is required", 401);
    }
    const decoded = verifyRefreshToken(refreshToken);
    if(!decoded){
        throw createError("Invalid refresh token", 401);
    }
    const user = await Users.findOneById({id: decoded.userId});
    if(!user){
        throw createError("User not found", 404);
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
};

export default {
    registerService,
    loginService,
    refreshTokenService
};