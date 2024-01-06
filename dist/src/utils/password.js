"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generateHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const environment_1 = require("../constant/environment");
let saltRounds = environment_1.env.SALT_ROUND || 'defaultSaltRounds';
const generateHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        saltRounds = parseInt(saltRounds);
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hash = bcrypt_1.default.hashSync(password.toString(), salt);
        return hash;
    }
    catch (err) {
        return err;
    }
});
exports.generateHash = generateHash;
const comparePassword = (password, hash) => bcrypt_1.default.compareSync(password, hash);
exports.comparePassword = comparePassword;
