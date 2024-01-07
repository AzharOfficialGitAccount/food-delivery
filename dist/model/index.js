"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Menu = exports.Restaurant = exports.Session = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const session_1 = require("./session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_1.Session; } });
const restaurant_1 = __importDefault(require("./restaurant"));
exports.Restaurant = restaurant_1.default;
const menu_1 = __importDefault(require("./menu"));
exports.Menu = menu_1.default;
const order_1 = __importDefault(require("./order"));
exports.Order = order_1.default;
const models = {
    User: user_1.default,
    Session: session_1.Session,
    Restaurant: restaurant_1.default,
    Menu: menu_1.default,
    Order: order_1.default
};
exports.default = models;
