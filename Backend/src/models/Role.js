import { model, Schema } from 'mongoose';

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    permissions: [{
        type: String,
        trim: true
    }]
}, { collection: 'roles', timestamps: true });

const Role = model("Role", roleSchema);
export default Role;
