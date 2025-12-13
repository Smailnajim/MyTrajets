import { Types, model, Schema } from 'mongoose';
import vehicleType from '../enums/vehicleType.js';
import vehicleStatus from '../enums/vehicleStatus.js';

const vehicleSchema = new Schema({
    position: {
        lat: { type: Number },
        lng: { type: Number }
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: vehicleType,
        required: true
    },
    status: {
        type: String,
        enum: vehicleStatus,
        default: "available"
    },
    derniereVidangeDhuileKm: {
        type: Number,
        default: 0
    },
    pneus: [{
        serialNumber: { type: String },
        position: { type: String },
        usure: {type: Number, efault: 0, min: 0},//change from % to km
        remplacement: {type: Boolean, default: false},
        kilometrageActuel: { type: Number, default: 0, min: 0 }
    }]
}, {collection: 'vehicles', timestamps: true});

const Vehicle = model("Vehicle", vehicleSchema);
export default Vehicle;
