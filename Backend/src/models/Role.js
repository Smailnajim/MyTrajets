import { model, Schema } from 'mongoose';
import roles from '../enums/roles.js';

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: roles,
        default: "chauffeur"
    },
    permissions: [{
        type: String,
        trim: true
    }]
}, { collection: 'roles', timestamps: true });

const Role = model("Role", roleSchema);
export default Role;
