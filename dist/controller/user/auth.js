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
exports.logout = exports.deleteAccount = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const response = __importStar(require("../../response/index"));
const httpStatus = __importStar(require("http-status"));
const model = __importStar(require("../../model"));
const commonService = __importStar(require("../../services/common"));
const passwordHash = __importStar(require("../../utils/password"));
const authJwt = __importStar(require("../../middleware/auth"));
const env = __importStar(require("../../constant/environment"));
const mongoose_1 = __importDefault(require("mongoose"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, mobile, profilePic, password, roles } = req.body;
        const { User } = model;
        const userData = {
            email: email.toLowerCase(),
            mobile,
            profilePic,
            password: yield passwordHash.generateHash(password),
            roles,
            userName
        };
        const checkEmail = yield commonService.getByCondition(User, { email });
        if (checkEmail) {
            return response.error(req, res, { msgCode: 'EMAIL_EXIST' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
        const userObj = yield commonService.create(User, userData);
        if (userObj) {
            return response.success(req, res, { msgCode: 'USER_CREATED', data: userObj }, httpStatus.OK);
        }
        else {
            return response.error(req, res, { msgCode: 'USER_CREATION_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, deviceToken, deviceId, deviceType } = req.body;
        const condition = { email, isDeleted: false, isActive: true };
        const { User } = model;
        const checkUser = yield commonService.getByCondition(User, condition);
        if (!checkUser) {
            return response.error(req, res, { msgCode: 'INVALID_CREDENTIALS' }, httpStatus.NOT_FOUND);
        }
        const isLogin = passwordHash.comparePassword(password, (checkUser === null || checkUser === void 0 ? void 0 : checkUser.password) || '');
        if (!isLogin) {
            return response.error(req, res, { msgCode: 'INVALID_CREDENTIALS' }, httpStatus.FORBIDDEN);
        }
        if (!(checkUser === null || checkUser === void 0 ? void 0 : checkUser.isActive)) {
            return response.error(req, res, { msgCode: 'BLOCK_MSG' }, httpStatus.FORBIDDEN);
        }
        const _a = checkUser instanceof mongoose_1.default.Document ? checkUser.toObject() : checkUser, { password: userPassword } = _a, resultData = __rest(_a, ["password"]);
        resultData.token = authJwt.generateAuthJwt({
            id: checkUser === null || checkUser === void 0 ? void 0 : checkUser._id,
            expiresIn: (Number(env.TOKEN_EXPIRES_IN) || 0).toString(),
            email,
            deviceId
        });
        if (!resultData.token) {
            return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
        }
        req.loginData = {
            deviceDetails: { deviceId, deviceToken, deviceType },
            authDetails: resultData
        };
        return next();
    }
    catch (err) {
        console.error(err);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req.data) === null || _b === void 0 ? void 0 : _b.id;
        const { User } = model;
        const projects = { _id: 1, email: 1, userName: 1, mobile: 1, profilePic: 1, roles: 1 };
        const adminExists = yield commonService.getByCondition(User, { _id: id }, projects);
        if (!adminExists) {
            return response.error(req, res, { msgCode: 'USER_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return response.success(req, res, { msgCode: 'PROFILE_FETCHED', data: adminExists }, httpStatus.OK);
    }
    catch (error) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.data.userId;
        const { User } = model;
        const { username, email, mobile, profilePic, roles } = req.body;
        const updateDetail = {
            username,
            email,
            mobile,
            profilePic,
            roles
        };
        const updatedUser = yield commonService.updateByCondition(User, userId, updateDetail);
        if (!updatedUser) {
            return response.error(req, res, { msgCode: 'USER_NOT_UPDATED' }, httpStatus.NOT_FOUND);
        }
        return response.success(req, res, { msgCode: 'PROFILE_UPDATED', data: updatedUser }, httpStatus.OK);
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.updateProfile = updateProfile;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { User, Session } = model;
        const userId = req.data.id;
        yield commonService.deleteAllByCondition(Session, { userId });
        const deleteAccount = yield commonService.updateByCondition(User, { _id: userId }, { isActive: false, isDeleted: true });
        if (!deleteAccount) {
            return response.error(req, res, { msgCode: 'FAILED_TO_DELETE' }, httpStatus.FORBIDDEN);
        }
        return response.success(req, res, { msgCode: 'USER_PROFILE_DELETED', data: {} }, httpStatus.OK);
    }
    catch (error) {
        console.log(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteAccount = deleteAccount;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const condition = { userId: (_c = req.data) === null || _c === void 0 ? void 0 : _c.id, deviceId: (_d = req.data) === null || _d === void 0 ? void 0 : _d.deviceId };
        const sessionModel = model.Session;
        const destroySession = yield commonService.deleteByField(sessionModel, condition);
        if (!destroySession) {
            return response.error(req, res, { msgCode: 'USER_NOT_FOUND' }, httpStatus.SOMETHING_WRONG);
        }
        return response.success(req, res, { msgCode: 'LOGOUT_SUCCESSFUL' }, httpStatus.OK);
    }
    catch (err) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
    }
});
exports.logout = logout;
