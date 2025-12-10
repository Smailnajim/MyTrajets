import RoleService from "../services/RoleService.js";
import successHandler from "../utils/successHandler.js";
import tryCatch from "../middlewares/tryCatch.js";

/**
 * Sync all roles permissions from permitions_roles
 * @route POST /api/roles/sync-permissions
 */
export const syncPermissions = tryCatch(async (req, res, next) => {
    const results = await RoleService.syncPermissions();
    return successHandler(res, 200, "Permissions synced successfully", results);
});
