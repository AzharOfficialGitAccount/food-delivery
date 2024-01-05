import { Document, Schema, Model, model } from 'mongoose';
import { UserType, Gender } from '../constant/common';

const userTypes = Object.values(UserType) as number[];
const userGenders = Object.values(Gender) as string[];

export interface UserDocument extends Document {
    mobile?: number;
    email: string;
    password?: string;
    profilePic?: string;
    userType: number;
    gender?: string;
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
        type: Number,
        enum: userTypes,
        default: UserType.USER
    },
    gender: {
        type: String,
        enum: userGenders
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
