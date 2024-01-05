import { Document, Schema, Model, model } from 'mongoose';
import { DeviceType } from '../constant/common';
import { UserDocument } from './user';

export interface SessionDocument extends Document {
    userId: UserDocument['_id'];
    deviceId: string;
    deviceType: number;
    deviceToken: string;
    accessToken: string;
    lastLoginDate: Date;
}

const sessionSchema: Schema<SessionDocument> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    deviceId: {
        type: String,
    },
    deviceType: {
        type: Number,
        enum: [DeviceType.Android, DeviceType.IOS, DeviceType.Web],
    },
    deviceToken: {
        type: String,
    },
    accessToken: {
        type: String,
    },
    lastLoginDate: {
        type: Date,
        default: Date.now(),
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

const Session: Model<SessionDocument> = model<SessionDocument>('sessions', sessionSchema);

export default Session;
