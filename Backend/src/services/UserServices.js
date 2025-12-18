import Users from "../repositories/Users.js";


const updatePassword = async (id, password)=>{
    return await Users.updatePassword(id, password);


}

export default {
    updatePassword,
}