"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const login = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    device_token: joi_1.default.string().required(),
    device_id: joi_1.default.string().required(),
    device_type: joi_1.default.string().default('web').optional()
});
exports.login = login;
const register = joi_1.default.object({
    email: joi_1.default.string().allow(''),
    mobile: joi_1.default.number().allow(''),
    profilePic: joi_1.default.string().allow(''),
    password: joi_1.default.string().required(),
    gender: joi_1.default.string().allow(''),
});
exports.register = register;
