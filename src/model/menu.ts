import { Document, Schema, Model, model, Types } from 'mongoose';

export interface MenuDocument extends Document {
    restaurantId: Types.ObjectId;
    restaurantOwnerId: Types.ObjectId;
    itemName: string;
    description: string;
    price: number;
    category: string;
    isVegetarian: boolean;
    isVegan: boolean;
    isSpicy: boolean;
    isDeleted?: boolean;
    isActive?: boolean;
}

const menuSchema: Schema<MenuDocument> = new Schema<MenuDocument>({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants',
    },
    restaurantOwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isVegetarian: {
        type: Boolean,
        default: false,
    },
    isVegan: {
        type: Boolean,
        default: false,
    },
    isSpicy: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

const Menu: Model<MenuDocument> = model<MenuDocument>('menus', menuSchema);

export default Menu;
