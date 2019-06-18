import * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    brand: String,
    strength: String,
    nicotine: Number,
    pouches: Number,
    types: String,
    size: String,
    created: {
        type: Date,
        default: Date.now,
    },
});
