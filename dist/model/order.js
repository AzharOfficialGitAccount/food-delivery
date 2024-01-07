"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Placed"] = "placed";
    OrderStatus["Delivered"] = "delivered";
    OrderStatus["Rejected"] = "rejected";
})(OrderStatus || (OrderStatus = {}));
const orderSchema = new mongoose_1.Schema({
    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Placed,
    },
    menuDetails: [
        {
            menuId: {
                type: mongoose_1.Schema.Types.ObjectId,
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
                type: mongoose_1.Schema.Types.ObjectId,
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
                type: mongoose_1.Schema.Types.ObjectId,
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
orderSchema.virtual('totalAmount').get(function () {
    if (this.menuDetails) {
        return this.menuDetails.reduce((total, menu) => total + (menu.price || 0), 0);
    }
    else {
        return 0;
    }
});
const Order = (0, mongoose_1.model)('orders', orderSchema);
exports.default = Order;
