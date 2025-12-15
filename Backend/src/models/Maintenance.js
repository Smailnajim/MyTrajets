import { Types, model, Schema } from 'mongoose';
import maintenanceType from '../enums/maintenanceType.js';

const maintenanceSchema = new Schema({
    vehicleId: {
        type: Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: maintenanceType,
        required: true
    },
    kmAtMaintenance: {
        type: Number,
        required: true,
        default: 0
    },
    suiviDate: {
        dateDebut: {
            type: Date,
            default: Date.now
        },
        dateFin: {
            type: Date
        }
    },
    coutDH: {
        type: Number,
        default: null
    }
}, { collection: 'maintenances', timestamps: true });

const Maintenance = model("Maintenance", maintenanceSchema);
export default Maintenance;
