"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const session_1 = require("./session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_1.Session; } });
const models = {
    User: user_1.default,
    Session: session_1.Session,
};
exports.default = models;
