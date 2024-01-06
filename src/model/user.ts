import { Document, Schema, Model, model } from 'mongoose';
import { UserType } from '../constant/common';

const userTypes = Object.values(UserType);

export interface UserDocument extends Document {
    mobile?: number;
    email: string;
    password?: string;
    profilePic?: string;
    userType: UserType;
    isDeleted?: boolean;
    isActive?: boolean;
    jwt?: string[];
}

const userTypeValidator = {
    validator: function (value: UserType) {
        return userTypes.includes(value);
    },
    message: 'Invalid user type'
};

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
        default: UserType.USER,
        validate: userTypeValidator
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
