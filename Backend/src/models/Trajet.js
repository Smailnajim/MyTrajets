import { Types, model, Schema } from 'mongoose';
import trajetStatus from '../enums/trajetStatus.js';

const trajetSchema = new Schema({
    chauffeurId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    camionId: {
        type: Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    remorqueId: {
        type: Types.ObjectId,
        ref: 'Vehicle'
    },
    suiviDate: {
        depart: {
            type: Date,
            required: true
        },
        arrive: {
            type: Date
        }
    },
    suiviGasoilML: {
        depart: {
            type: Number,
            default: 0
        },
        arrive: {
            type: Number,
            default: 0
        }
    },
    statuts: {
        type: String,
        enum: trajetStatus,
        default: "pending"
    },
    emplacement: {
        depart: {
            lat: { type: Number },
            lng: { type: Number },
            address: { type: String }
        },
        arrive: {
            lat: { type: Number },
            lng: { type: Number },
            address: { type: String }
        }
    },
    kilometrage:{
        type: Number,
        default: 0
    }
}, {collection: 'trajets', timestamps: true});

const Trajet = model("Trajet", trajetSchema);
export default Trajet;
