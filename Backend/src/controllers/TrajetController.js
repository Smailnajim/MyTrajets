import TrajetService from "../services/TrajetService.js";
import successHandler from "../utils/successHandler.js";
import tryCatch from "../middlewares/tryCatch.js";

/**
 * Get trajets filtered by status
 * @route GET /api/trajets/status/:status
 */
const getTrajetsByStatus = tryCatch(async (req, res, next) => {
    const { status } = req.params;
    const user = req.user;
    const roleName = user.roleId?.name?.toLowerCase();
    const filters = { statuts: status };

    if (roleName == 'chauffeur') {
        filters.chauffeurId = user._id;
    }
    const trajets = await TrajetService.getAllTrajets(filters);
    return successHandler(res, 200, `Trajets with status '${status}' retrieved successfully`, trajets);
});

/**
 * Get total kilometrage for each camion
 * @route GET /api/camions/kilometrage
 */
const getCamionKilometrage = tryCatch(async (req, res, next) => {
    const camions = await TrajetService.getCamionKilometrage();
    return successHandler(res, 200, "Camion kilometrage retrieved successfully", camions);
});

/**
 * Get total kilometrage for each remorque
 * @route GET /api/remorques/kilometrage
 */
const getRemorqueKilometrage = tryCatch(async (req, res, next) => {
    const remorques = await TrajetService.getRemorqueKilometrage();
    return successHandler(res, 200, "Remorque kilometrage retrieved successfully", remorques);
});


/**
 * Get total kilometrage for each pneu 
 * @route GET /api/pneus/kilometrage 
 */
const getPneuKilometrage = tryCatch( async()=>{
    const pneus = TrajetService.getPneuKilometrage();
});

export default {
    getTrajetsByStatus,
    getCamionKilometrage,
    getRemorqueKilometrage,
    getPneuKilometrage
}