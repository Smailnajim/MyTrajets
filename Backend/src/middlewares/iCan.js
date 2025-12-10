import createError from "../utils/createError.js";
import Roles from "../repositories/Roles.js";

/**
 * Authorization middleware - checks if user has required permission
 * @param {string} permission - Required permission to access the route
 */
const iCan = (permission) => {
    return async (req, res, next) => {
        if(!req.user) return next(createError("Authentication required", 401));

        const role = await Roles.findOneById(req.user.roleId);

        if(!role) return next(createError("Role not found", 404));
        
        if (!role.permissions.includes(permission)) return next(createError("You don't have permission to perform this action", 403));
        next();
    };
};
export default iCan;