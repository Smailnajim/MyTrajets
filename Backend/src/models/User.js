import {Types, model, Schema} from 'mongoose';
import userEtat from '../enums/userEtat.js';
import bcrypt from "bcrypt";

const userSchema = new Schema({
    roleId: {
        type: Types.ObjectId, 
        ref: 'Role',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        enum: userEtat,
        default: "registered"
    }
}, {collection: 'users', timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);
export default User;