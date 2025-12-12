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
const getPneuKilometrage = tryCatch(async (req, res) => {
    const pneus = TrajetService.getPneuKilometrage();
    return successHandler(res, 200, "Pneu kilometrage retrieved successfully", pneus);
});



/**
 * Get all trajets
 * @route GET /api/trajets
 */
const getAllTrajets = tryCatch(async (req, res, next) => {
    const trajets = await TrajetService.allTrajets();
    return successHandler(res, 200, "get trajets by successfully", trajets);
})
/**
 * Get a trajet spesifique
 * @route GET /api/trajets/:id
 */
const getTrajet = tryCatch(async (req, res, next) => {
    const { id: trajetId } = req.params;
    const user = req.user;
    const trajet = await TrajetService.getTrajet(trajetId, user);
    return successHandler(res, 200, "get trajet by successfully", trajet);
})

/**
 * Get total consumption for a specific camion
 * @route GET /api/camions/:id/carburant
 */
const getCamionConsommation = tryCatch(async (req, res) => {
    const { id } = req.params;
    const consommation = await TrajetService.getCamionConsommation(id);
    return successHandler(res, 200, "Camion consumption retrieved successfully", consommation);
});

/**
 * Get consumption for a specific trajet of a specific camion
 * @route GET /api/camions/:camionId/trajet/:trajetId/carburant
 */
const getTrajetConsommation = tryCatch(async (req, res) => {
    const { camionId, trajetId } = req.params;
    const result = await TrajetService.getTrajetConsommation(camionId, trajetId, req.user);
    return successHandler(res, 200, "camion's consommation selected by successfuly", result);
});

/**
 * Create a new trajet
 * @route POST /api/trajets
 */
const createTrajet = tryCatch(async (req, res) => {
    const trajet = await TrajetService.createTrajet(req.body);
    return successHandler(res, 201, "Trajet created successfully", trajet);
});

export default {
    getTrajetsByStatus,
    getCamionKilometrage,
    getRemorqueKilometrage,
    getAllTrajets,
    getTrajet,
    getPneuKilometrage,
    getCamionConsommation,
    getTrajetConsommation,
    createTrajet
}