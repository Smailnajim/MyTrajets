import Users from "../repositories/Users.js";
import { verifyToken } from "../utils/token.js";
import createError from "../utils/createError.js";

export default async function(req, res, next){
    const accessauth = req.headers['authorization'];
    const token = accessauth && accessauth.split(' ')[1].trim();

    if(!token){
        return next(createError("Unauthorized", 401));
    }
    const decoded = verifyToken(token);
    if(!decoded){
        return next(createError("Unauthorized", 401));
    }
    const user = await Users.findOneByIdWithRole(decoded.userId);
    if(!user){
        return next(createError("User not found", 404));
    }
    req.user = user;
    next();
}