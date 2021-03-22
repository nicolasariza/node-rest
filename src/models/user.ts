import mongoose , { Schema, model, Document, mongo } from 'mongoose';

enum Role {
    ADMIN_ROLE = 'ADMIN_ROLE',
    USER_ROLE = 'ADMIN_ROLE'
}

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    img: string;
    role: Role;
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
        required: true,
        enum: Object.values(Role)
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

export default mongoose.model<IUser>('User', UserSchema);