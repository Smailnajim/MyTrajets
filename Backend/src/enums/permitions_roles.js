import permitions from "./permitions";

const permitions_roles = {
    admin: [
        permitions.accept_user,
        permitions.update_permissions
    ],
    chauffeur: []
};
export default permitions_roles;