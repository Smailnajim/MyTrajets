import tryCatch from "../middlewares/tryCatch.js";

/**
 * Get trajets filtered by status
 * @route GET /api/trajets/status/:status
 */
export const getTrajetsByStatus = tryCatch(async (req, res, next) => {
    const { status } = req.params;
    const user = req.user;
    const roleName = user.roleId?.name?.toLowerCase();
    const filters = {statuts: status};

    if (roleName == 'chauffeur'){
        filters.chauffeurId = user._id;
    }
    const trajets = await TrajetService.getAllTrajets(filters);
});