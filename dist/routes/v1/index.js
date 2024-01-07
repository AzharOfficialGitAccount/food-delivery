"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const restaurant_1 = __importDefault(require("./restaurant"));
const menu_1 = __importDefault(require("./menu"));
const order_1 = __importDefault(require("./order"));
const app = (0, express_1.default)();
app.use('/user', user_1.default);
app.use('/restaurant', restaurant_1.default);
app.use('/menu', menu_1.default);
app.use('/order', order_1.default);
exports.default = app;
