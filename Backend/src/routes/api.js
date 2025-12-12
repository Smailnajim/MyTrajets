import express from "express";
import { register, login, refreshToken, acceptUser } from "../controllers/AuthController.js";
import { syncPermissions } from "../controllers/RoleController.js";
import TrajetController from "../controllers/TrajetController.js";
import { registerValidation, loginValidation, validate } from "../validators/authValidator.js";
import isAuth from "../middlewares/isAuth.js";
import iCan from "../middlewares/iCan.js";
import permitions from "../enums/permitions.js";
import VehicleController from "../controllers/VehicleController.js";

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


export default router;