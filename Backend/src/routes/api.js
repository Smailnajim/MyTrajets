import express from "express";
import { register, login, refreshToken, acceptUser, getAllUsers, changeUserRole, getAllRoles } from "../controllers/AuthController.js";
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
import MaintenanceController from "../controllers/MaintenanceController.js";
import maintenanceValidator from "../validators/maintenanceValidator.js";
import userController from './../controllers/UserControllee.js';
const router = express.Router();


router.get('/', (req, res) => {
    res.json("api work");
});


router.post('/users/register', registerValidation, validate, register);
router.post('/users/login', loginValidation, validate, login);
router.post('/users/refresh-token', refreshToken);
router.get('/users', getAllUsers);// isAuth, iCan(permitions.accept_user), 
router.patch('/users/:id/accept', acceptUser);//isAuth, iCan(permitions.accept_user), 
router.patch('/users/:id/role', changeUserRole);//isAuth, iCan(permitions.update_permissions), 

router.get('/roles', getAllRoles);//isAuth, 
router.post('/roles/sync-permissions', syncPermissions);//isAuth, iCan(permitions.update_permissions), 

router.get('/trajets/status/:status', isAuth, TrajetController.getTrajetsByStatus);//  
router.get('/camions/kilometrage', TrajetController.getCamionKilometrage);//isAuth, iCan(permitions.getTotalKilometrage), 
router.get('/remorques/kilometrage', TrajetController.getRemorqueKilometrage);// isAuth, iCan(permitions.getTotalKilometrage),
router.get('/pneus/kilometrage', TrajetController.getPneuKilometrage);//// isAuth, iCan(permitions.getTotalKilometrage),
router.get('/vehicle/:id/kilometrage', VehicleController.getVehicle_s_PneusKilometrage);
router.get('/vehicles', VehicleController.getAllVehicles);//isAuth,
router.post('/vehicles', VehicleController.createVehicle);//isAuth,
router.get('/vehicles/:id', VehicleController.getVehicleById);// isAuth, 
router.post('/vehicles/:id/pneus', VehicleController.addPneuToVehicle);
router.patch('/vehicles/:id', VehicleController.updateVehicle);
router.delete('/vehicles/:id', VehicleController.deleteVehicle);

// **when get trajet there is a virtual field is consommation**
router.get('/trajets', isAuth, TrajetController.getAllTrajets);
router.get('/trajets/:id', isAuth, TrajetController.getTrajet);

router.get('/camions/:id/carburant', TrajetController.getCamionConsommation);//isAuth, iCan(permitions.consomation_total_camion),
router.get('/camions/:camionId/trajet/:trajetId/carburant', TrajetController.getTrajetConsommation);// isAuth,

router.post('/trajets', trajetValidator.createTrajetValidation, validate, TrajetController.createTrajet);//iCan('create_trajet')
router.patch('/trajets/:id', trajetValidator.updateTrajetValidation, validate, TrajetController.updateTrajet);//iCan('update_trajet')

router.get('/trajets/not-started', TrajetController.trajetsNotStarted);//
router.get('/users/:id/trajets', TrajetController.getChauffeurTrajets)//  to get user's trajets for any user  isAuth, iCan(permitions.get_any_trajet),
router.get('/users/trajets', TrajetController.getAllMyTrajets)//isAuth to get my trajets (just fo chauffeur)

router.patch('/users/trajets/:id', trajetValidator.updateTrajetForChauffeurValidation, validate, TrajetController.updateTrajet);//iCan('update_trajet_Chauffeur')
router.patch('/users/:id/password', userController.updatePassword);

router.post('/Maintenance-rules', maintenanceRuleValidator.createRuleValidation, validate, MaintenanceRuleController.createRule);
router.get('/maintenance-rules', MaintenanceRuleController.getAllRules);
router.patch('/maintenance-rules/:id', maintenanceRuleValidator.updateRuleValidation, validate, MaintenanceRuleController.updateRule);
router.delete('/maintenance-rules/:id', MaintenanceRuleController.deleteRule);


router.post('/maintenances', maintenanceValidator.createMaintenanceValidation, validate, MaintenanceController.createMaintenance);
router.get('/maintenances', MaintenanceController.getAllMaintenances);
router.patch('/maintenances/:id', maintenanceValidator.updateMaintenanceValidation, validate, MaintenanceController.updateMaintenance);
router.get('/maintenance/alerts', MaintenanceController.getFleetStatus); // The Dashboard Endpoint
export default router;