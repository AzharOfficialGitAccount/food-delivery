"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    menuId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'menus'
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false
});
const Restaurant = (0, mongoose_1.model)('restaurants', restaurantSchema);
exports.default = Restaurant;
