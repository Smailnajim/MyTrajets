import Vehicles from "../repositories/Vehicles.js";


/**
 * get a Vehicle's pneus using id
 * @param {String} vehicleId
 * @returns {Promise<Array>}
 */
const getVehicle_s_PneusKilometrage = async (vehicleId)=>{
    return await Vehicles.getVehicle_s_PneusKilometrage(vehicleId);
}

export default {
    getVehicle_s_PneusKilometrage
}