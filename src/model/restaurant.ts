import { Document, Schema, Model, model } from 'mongoose';
export interface RestaurantDocument extends Document {
    contactNo?: number;
    name: string,
    ownerId: string,
    address: string,
    media: string,
    url: string,
    isDeleted?: boolean;
    isActive?: boolean;
}

const restaurantSchema: Schema<RestaurantDocument> = new Schema({
    name: {
        type: String,
    },
    contactNo: {
        type: Number
    },
    ownerId: {
        type: String
    },
    address: {
        type: String
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
