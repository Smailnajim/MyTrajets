import permitions from "./permitions.js";

const permitions_roles = {
    admin: [
        permitions.accept_user,
        permitions.update_permissions,
        permitions.show_all_trajets,
        permitions.get_any_trajet,
        permitions.consomation_total_camion,
    ],
    chauffeur: []
};
export default permitions_roles;