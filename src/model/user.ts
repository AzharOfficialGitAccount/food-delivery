import { Document, Schema, Model, model } from 'mongoose';
export interface UserDocument extends Document {
    mobile?: number;
    email: string;
    userName: string,
    password?: string;
    profilePic?: string;
    userStatus?: string;
    address?: string,
    isDeleted?: boolean;
    isActive?: boolean;
    jwt?: string[];
}

export enum userStatus {
    Owner = 'Owner',
    Customer = 'User',
}

const userSchema: Schema<UserDocument> = new Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
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
    userStatus: {
        type: String,
        enum: Object.values(userStatus),
        default: userStatus.Customer,
    },
    address: {
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
},
    {
        timestamps: true,
        versionKey: false
    });

const User: Model<UserDocument> = model<UserDocument>('users', userSchema);

export default User;
