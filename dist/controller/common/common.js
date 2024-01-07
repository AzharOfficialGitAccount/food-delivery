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
exports.createSession = void 0;
const response = __importStar(require("../../response/index"));
const httpStatus = __importStar(require("http-status"));
const model = __importStar(require("../../model"));
const commonService = __importStar(require("../../services/common"));
const commonConstant = __importStar(require("../../constant/common"));
const helper = __importStar(require("../../utils/helper"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deviceId, deviceToken } = req.loginData.deviceDetails;
        const condition = { deviceId };
        const { Session } = model;
        const checkSession = yield commonService.getByCondition(Session, condition);
        if (checkSession) {
            yield commonService.updateByCondition(Session, condition, {
                lastLoginDate: (0, moment_timezone_1.default)().valueOf(),
                accessToken: req.loginData.authDetails.token,
            });
        }
        else {
            const sessionData = {
                userId: req.loginData.authDetails._id,
                deviceId,
                deviceToken,
                deviceType: commonConstant.DeviceType.Android,
                accessToken: req.loginData.authDetails.token,
            };
            const createSession = yield commonService.create(Session, sessionData);
            if (!createSession) {
                return response.error(req, res, { msgCode: helper.getErrorMsgCode(req) }, httpStatus.FORBIDDEN);
            }
        }
        const data = __rest(req.loginData.authDetails, []);
        const msgCode = helper.getSuccessMsgCode(req);
        const resData = { userName: data.userName, email: data.email, token: data.token };
        return response.success(req, res, { msgCode, data: resData }, httpStatus.OK);
    }
    catch (err) {
        console.error(err);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.createSession = createSession;
