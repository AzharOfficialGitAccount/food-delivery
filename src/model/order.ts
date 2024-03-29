import { Document, Schema, Model, model, Types } from 'mongoose';

interface Menu {
    menuId: Types.ObjectId;
    price: number;
    itemName: string;
}

interface UserDetails {
    userId: Types.ObjectId;
    email: string;
    userName: string;
    mobile: number;
    roles: string;
}

interface RestaurantDetails {
    restaurantId: Types.ObjectId;
    name: string;
    address: string;
}

export interface OrderDocument extends Document {
    userId: Types.ObjectId;
    restaurantId: Types.ObjectId;
    orderStatus?: string;
    menuDetails?: Menu[];
    userDetails?: UserDetails[];
    restaurantDetails?: RestaurantDetails[];
    paymentStatus?: string;
    transactionId?: string;
    totalAmount?: number;
}

export enum OrderStatus {
    Placed = 'placed',
    Processing = 'processing',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Cancelled = 'cancelled',
}

const orderSchema: Schema<OrderDocument> = new Schema({
    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Placed,
    },
    menuDetails: [
        {
            menuId: {
                type: Schema.Types.ObjectId,
                ref: 'menus',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            itemName: {
                type: String,
                required: true,
            },
        },
    ],
    userDetails: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            userName: {
                type: String,
                required: true,
            },
            mobile: {
                type: Number,
                required: true,
            },
        },
    ],
    restaurantDetails: [
        {
            restaurantId: {
                type: Schema.Types.ObjectId,
                ref: 'restaurants',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        default: 0,
    },
    paymentStatus: {
        type: String,
    },
    transactionId: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Order: Model<OrderDocument> = model<OrderDocument>('orders', orderSchema);

export default Order;
