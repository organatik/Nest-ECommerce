import * as mongoose from 'mongoose';


export const ProductSchem = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    brand: String,
    strength: String,
    nicotine: Number,
    pounches: Number,
    types: String,
    size: String,
    created: {
        type: Date,
        default: Date.now
    }
})