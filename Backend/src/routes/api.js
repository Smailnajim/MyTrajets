import express from "express";
import { register, login, refreshToken, acceptUser } from "../controllers/AuthController.js";
import { syncPermissions } from "../controllers/RoleController.js";
import TrajetController from "../controllers/TrajetController.js";
import { registerValidation, loginValidation, validate } from "../validators/authValidator.js";
import isAuth from "../middlewares/isAuth.js";
import iCan from "../middlewares/iCan.js";
import permitions from "../enums/permitions.js";
import VehicleController from "../controllers/VehicleController.js";
import trajetValidator from "../validators/trajetValidator.js";
import MaintenanceRuleController from "../controllers/MaintenanceRuleController.js";
import maintenanceRuleValidator from "../validators/maintenanceRuleValidator.js";

const router = express.Router();


router.get('/', (req, res) => {
    res.json("api work");
});


router.post('/users/register', registerValidation, validate, register);
router.post('/users/login', loginValidation, validate, login);
router.post('/users/refresh-token', refreshToken);
router.patch('/users/:id/accept', acceptUser);//isAuth, iCan(permitions.accept_user),

router.post('/roles/sync-permissions', syncPermissions);//isAuth, iCan(permitions.update_permissions),

router.get('/trajets/status/:status', TrajetController.getTrajetsByStatus);//isAuth,
router.get('/camions/kilometrage', TrajetController.getCamionKilometrage);//isAuth, iCan(permitions.getTotalKilometrage),
router.get('/remorques/kilometrage', TrajetController.getRemorqueKilometrage);//isAuth, iCan(permitions.getTotalKilometrage),
router.get('/pneus/kilometrage', TrajetController.getPneuKilometrage);////isAuth, iCan(permitions.getTotalKilometrage),
router.get('/vehicle/:id/kilometrage', VehicleController.getVehicle_s_PneusKilometrage);
// **when get trajet there is a virtual field is consommation**
router.get('/trajets', TrajetController.getAllTrajets);
router.get('/trajets/:id', TrajetController.getTrajet);

router.get('/camions/:id/carburant', TrajetController.getCamionConsommation);//iCan("consomation_total_camion")
router.get('/camions/:camionId/trajet/:trajetId/carburant', TrajetController.getTrajetConsommation);

router.post('/trajets', trajetValidator.createTrajetValidation, validate, TrajetController.createTrajet);//iCan('create_trajet')
router.patch('/trajets/:id', trajetValidator.updateTrajetValidation, validate, TrajetController.updateTrajet);//iCan('update_trajet')

router.get('/trajets/not-started', TrajetController.trajetsNotStarted);//
router.get('/users/:id/trajets', TrajetController.getChauffeurTrajets)//isAuth, iCan(get_any_trajet)  to get user's trajets for any user
router.get('/users/trajets', TrajetController.getAllMyTrajets)//isAuth to get my trajets (just fo chauffeur)

router.patch('/users/trajets/:id', trajetValidator.updateTrajetForChauffeurValidation, validate, TrajetController.updateTrajet);//iCan('update_trajet_Chauffeur')

router.post('/Maintenance-rules', maintenanceRuleValidator.createRuleValidation, validate, MaintenanceRuleController.createRule);
router.get('/maintenance-rules', MaintenanceRuleController.getAllRules);
router.patch('/maintenance-rules/:id', maintenanceRuleValidator.updateRuleValidation, validate, MaintenanceRuleController.updateRule);

export default router;