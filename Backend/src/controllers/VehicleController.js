import tryCatch from "../middlewares/tryCatch.js"
import VehicleService from "../services/VehicleService.js";
import successHandler from "../utils/successHandler.js";

/**
 * Get total kilometrage for spicifique vehicle's pneus by _id 
 * @route GET /api/vehicle/:id/kilometrage 
 */
const getVehicle_s_PneusKilometrage = tryCatch( async(req, res, next)=>{
    const {id: vehicleId} = req.params;
    const pneus = await VehicleService.getVehicle_s_PneusKilometrage(vehicleId);
    successHandler(res, 200, "select kilometrage for vehicl's pneus By successfully", pneus);
});

export default {
    getVehicle_s_PneusKilometrage
}