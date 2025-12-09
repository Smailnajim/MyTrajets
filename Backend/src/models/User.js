import {Types, model, Schema} from 'mongoose';
import userEtat from '../enums/userEtat.js';

const userSchema = new Schema({
    roleId: {
        type: Types.ObjectId, 
        ref: 'Role',
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    etat: {
        type: String,
        enum: userEtat,
        default: "registered"
    }
}, {collection: 'users', timestamps: true });



const User = model("User", userSchema);
export default User;