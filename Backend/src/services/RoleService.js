import Role from "../models/Role.js";
import permitions_roles from "../enums/permitions_roles.js";
import Roles from "../repositories/Roles.js";

/**
 * Sync all roles permissions from permitions_roles enum
 * @returns {Promise<Array>} Array of sync results
 */
const syncPermissions = async () => {
    const results = [];

    for (const [roleName, permissions] of Object.entries(permitions_roles)) {
        const updatedRole = await Roles.findOneAndUpdatePermissions(roleName, permissions);
        if (updatedRole) {
            results.push({
                role: roleName,
                permissions: permissions,
                status: "updated"
            });
        } else {
            results.push({
                role: roleName,
                permissions: permissions,
                status: "not found in db"
            });
        }
    }
    return results;
};

export default {
    syncPermissions
};
