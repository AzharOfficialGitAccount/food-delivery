"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuQuery = exports.menu = exports.restaurant = exports.profile = exports.register = exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const login = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    deviceToken: joi_1.default.string().required(),
    deviceId: joi_1.default.string().required(),
    deviceType: joi_1.default.string().default('web').optional()
});
exports.login = login;
const register = joi_1.default.object({
    email: joi_1.default.string().allow(''),
    userName: joi_1.default.string().allow(''),
    mobile: joi_1.default.number().allow(''),
    profilePic: joi_1.default.string().allow(''),
    password: joi_1.default.string().required(),
    roles: joi_1.default.string().required(),
});
exports.register = register;
const restaurant = joi_1.default.object({
    name: joi_1.default.string().allow(''),
    contactNo: joi_1.default.number().allow(''),
    address: joi_1.default.string().allow(''),
    media: joi_1.default.string().allow(''),
    url: joi_1.default.string().allow(''),
    cuisine: joi_1.default.string().allow(''),
    openingHours: joi_1.default.string().allow(''),
    menuId: joi_1.default.string().allow()
});
exports.restaurant = restaurant;
const menu = joi_1.default.object({
    itemName: joi_1.default.string().allow(''),
    description: joi_1.default.string().allow(''),
    price: joi_1.default.number().allow(''),
    category: joi_1.default.string().allow(''),
    restaurantId: joi_1.default.string().allow(''),
    isVegetarian: joi_1.default.boolean().allow(''),
    isVegan: joi_1.default.boolean().allow(''),
    isSpicy: joi_1.default.boolean().allow()
});
exports.menu = menu;
const menuQuery = joi_1.default.object({
    ownerId: joi_1.default.string().allow(),
    restaurantId: joi_1.default.string().allow(),
    menuId: joi_1.default.string().allow()
});
exports.menuQuery = menuQuery;
const profile = joi_1.default.object({
    email: joi_1.default.string().allow(''),
    userName: joi_1.default.string().allow(''),
    profilePic: joi_1.default.string().allow(''),
    mobile: joi_1.default.number().allow(),
    roles: joi_1.default.string().allow()
});
exports.profile = profile;
