import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export const UserChema = new mongoose.Schema({
    name: String,
    password: String,
    seller : {
        type: Boolean,
        default: false
    },
    address : {
        city: String,
        street: String,
        apartment: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserChema.pre('save', async (next: mongoose.HookNextFunction) => {
    try {
        if (!this.isModified('password')){
            return next();
        }
        const hashed = await bcrypt.hash(this['password', 10]);
        this['password'] = hashed;
        return next()
    } catch(err) {
        return next(err);
    }
})