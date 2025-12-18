import tryCatch from "../middlewares/tryCatch.js"
import successHandler from "../utils/successHandler.js";
import UserServices from "./../services/UserServices.js"

const updatePassword = tryCatch(async (req, res)=>{
    const {id} = req.params;
    const {password} = req.body;
    const user = await UserServices.updatePassword(id, password);
    return successHandler(res, 201, "update user's password by successflly.", user);
})

export default {
    updatePassword,
}