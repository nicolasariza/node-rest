import mongoose , { Schema } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const CategorySchema: Schema = new Schema({
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
    }
})

export default mongoose.model<ICategory>('Category', CategorySchema);