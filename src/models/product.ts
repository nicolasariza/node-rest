import mongoose , { Schema } from 'mongoose';
import { IProduct } from '../interfaces/products.interface';

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id,  ...product} = this.toObject();
    product.id = _id;
    return product;
}

export default mongoose.model<IProduct>('Product', ProductSchema);