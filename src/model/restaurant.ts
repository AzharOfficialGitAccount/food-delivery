import { Document, Schema, Model, model, Types } from 'mongoose';
export interface RestaurantDocument extends Document {
    ownerId: Types.ObjectId,
    contactNo?: number;
    name: string,
    menu: string,
    cuisine: string,
    openingHours: string,
    address: string,
    media: string,
    url: string,
    isDeleted?: boolean;
    isActive?: boolean;
}

const restaurantSchema: Schema<RestaurantDocument> = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    cuisine: {
        type: String,
    },
    openingHours: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    media: {
        type: String
    },
    url: {
        type: String
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

const Restaurant: Model<RestaurantDocument> = model<RestaurantDocument>('restaurants', restaurantSchema);

export default Restaurant;
