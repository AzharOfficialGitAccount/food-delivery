import { Document, Schema, Model, model } from 'mongoose';
export interface OrderDocument extends Document {
    userId: string;
    restaurantId: string;
    status?: string;
    amount?: string;
    isDeleted?: boolean;
    isActive?: boolean;
}

const userSchema: Schema<OrderDocument> = new Schema({
    userId: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
    },
    status: {
        type: String
    },
    amount: {
        type: Number
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

const Order: Model<OrderDocument> = model<OrderDocument>('orders', userSchema);

export default Order;
