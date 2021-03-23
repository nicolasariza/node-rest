import mongoose , { Schema, Document } from 'mongoose';

interface IRole extends Document {
    role: string;
}

const RoleSchema: Schema = new Schema({
    role: {
        type: String,
        required: [true, 'role is required']
    }
})

export default mongoose.model<IRole>('Role', RoleSchema);