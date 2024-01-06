import { Document, Schema, Model, model } from 'mongoose';
export interface MenuDocument extends Document {
    restaurantId: string;
    itemName?: string;
    description: string,
    price?: number;
    isDeleted?: boolean;
    isActive?: boolean;
}

const menuSchema: Schema<MenuDocument> = new Schema({
    restaurantId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
    },
    price: {
        type: Number
    },
    description: {
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

const Menu: Model<MenuDocument> = model<MenuDocument>('menus', menuSchema);

export default Menu;
