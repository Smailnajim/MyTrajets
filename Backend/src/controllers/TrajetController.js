import TrajetService from "../services/TrajetService.js";
import successHandler from "../utils/successHandler.js";
import tryCatch from "../middlewares/tryCatch.js";
import { matchedData } from "express-validator";

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
    const trajets = await TrajetService.allTrajets(req.user._id);
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
    const body = matchedData(req, { locations: ["body"] });
    const trajet = await TrajetService.createTrajet(body);
    return successHandler(res, 201, "Trajet created successfully", trajet);
});

/**
 * Update a new trajet
 * @route Patch /api/trajets
 */
const updateTrajet = tryCatch(async (req, res) => {
    const body = matchedData(req, { locations: ['params', 'body'] });
    const trajet = await TrajetService.updateTrajet(body);
    return successHandler(res, 201, "Trajet created successfully", trajet);
});


/**
 * function contriller to select  Trajets for a chauffeur is AUTH
 * @route GET /api/users/trajets
 */
const getAllMyTrajets = tryCatch(async (req, res, next) => {
    const Trajets = await TrajetService.chauffeur_s_Trajets(req.user?._id);
    successHandler(res, 200, "these are your Trajets those assigned to you", Trajets);
});

/**
 * GET allt trajets those assigned to chauffeur
 * @route GET /api/users/:id/trajets
 */
const getChauffeurTrajets = tryCatch(async (req,res, next)=>{
    const {id} = req.params;
    const Trajets = await TrajetService.chauffeur_s_Trajets(id);
    successHandler(res, 200, `these are Trajets those assigned to ${id}`, Trajets);
});

/**
 * GET trajets that have not started despite departure time passing
 * @route GET /api/trajets/not-started
 */
const trajetsNotStarted = tryCatch(async (req, res) => {
    const trajets = await TrajetService.trajetsNotStarted();
    return successHandler(res, 200, "Trajets not started retrieved successfully", trajets);
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
    createTrajet,
    getAllMyTrajets,
    getChauffeurTrajets,
    trajetsNotStarted,
    updateTrajet
}