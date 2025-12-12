import permitions from "./permitions.js";

const permitions_roles = {
    admin: [
        permitions.accept_user,
        permitions.update_permissions,
        permitions.show_all_trajets
    ],
    chauffeur: []
};
export default permitions_roles;