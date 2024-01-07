"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.generateAuthJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response = __importStar(require("../response/index"));
const http_status_1 = __importDefault(require("http-status"));
const commonService = __importStar(require("../services/common"));
const model_1 = require("../model");
const environment_1 = require("../constant/environment");
const generateAuthJwt = (payload) => {
    const { expiresIn } = payload, params = __rest(payload, ["expiresIn"]);
    const token = jsonwebtoken_1.default.sign(params, environment_1.env.SECRET_KEY || '', { expiresIn });
    if (!token) {
        return false;
    }
    return token;
};
exports.generateAuthJwt = generateAuthJwt;
const verifyAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return response.error(req, res, { msgCode: 'MISSING_TOKEN' }, http_status_1.default.UNAUTHORIZED);
        }
        const cleanedToken = token.replace(/^Bearer\s+/, '');
        const decoded = jsonwebtoken_1.default.decode(cleanedToken);
        const sessionModel = model_1.Session;
        const UserModel = model_1.User;
        const condition = { accessToken: cleanedToken };
        const userId = decoded.userId || decoded._id;
        const checkJwt = yield commonService.getByCondition(sessionModel, condition);
        if (!checkJwt) {
            const userCondition = { _id: userId, isActive: false, isDeleted: true };
            const checkUser = yield commonService.getByCondition(UserModel, userCondition);
            if (checkUser) {
                return response.error(req, res, { msgCode: 'USER_IS_DELETED' }, http_status_1.default.UNAUTHORIZED);
            }
            return response.error(req, res, { msgCode: 'INVALID_TOKEN' }, http_status_1.default.UNAUTHORIZED);
        }
        else {
            const userCondition = { _id: checkJwt.userId, isDeleted: false, isActive: true };
            const checkUser = yield commonService.getByCondition(UserModel, userCondition);
            if (!checkUser) {
                return response.error(req, res, { msgCode: 'USER_IS_BLOCKED' }, http_status_1.default.UNAUTHORIZED);
            }
            req.data = decoded;
            return next();
        }
    }
    catch (err) {
        console.error(err);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, http_status_1.default.INTERNAL_SERVER_ERROR);
    }
});
exports.verifyAuthToken = verifyAuthToken;
