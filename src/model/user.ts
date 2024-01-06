import { Document, Schema, Model, model } from 'mongoose';
export interface UserDocument extends Document {
    mobile?: number;
    email: string;
    password?: string;
    profilePic?: string;
    userType?: string;
    isDeleted?: boolean;
    isActive?: boolean;
    jwt?: string[];
}

const userSchema: Schema<UserDocument> = new Schema({
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    password: {
        type: String
    },
    profilePic: {
        type: String
    },
    userType: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    jwt: [{
        type: String
    }]
},
    {
        timestamps: true,
        versionKey: false
    });

const User: Model<UserDocument> = model<UserDocument>('users', userSchema);

export default User;
