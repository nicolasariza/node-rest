import mongoose , { Schema, Document } from 'mongoose';
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    img: string;
    role: string;
    state: boolean;
    google: boolean;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model<IUser>('User', UserSchema);