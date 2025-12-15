import { Schema, model } from 'mongoose';
import maintenanceType from '../enums/maintenanceType.js';
import vehicleType from '../enums/vehicleType.js';

const maintenanceRuleSchema = new Schema({
    type: {
        type: String,
        enum: maintenanceType,
        required: true
    },
    vehicleType: {
        type: String,
        enum: vehicleType,
        required: true
    },
    intervalKm: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    }
}, { collection: 'maintenance_rules', timestamps: true });

// Prevent duplicate rules for same maintenance type and vehicle type
maintenanceRuleSchema.index({ type: 1, vehicleType: 1 }, { unique: true });

const MaintenanceRule = model('MaintenanceRule', maintenanceRuleSchema);
export default MaintenanceRule;