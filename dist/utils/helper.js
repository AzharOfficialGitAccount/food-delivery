"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUUID = exports.getErrorMsgCode = exports.getSuccessMsgCode = exports.getPagination = void 0;
const uuid_1 = require("uuid");
const getPagination = (page = 1, size) => {
    const limit = size || 10;
    const skip = page ? (page - 1) * limit : 0;
    return { limit, skip };
};
exports.getPagination = getPagination;
const getSuccessMsgCode = (req) => {
    let msgCode;
    if (req.url.slice(1) === 'signup') {
        msgCode = 'SIGNUP_SUCCESSFUL';
    }
    else {
        msgCode = 'LOGIN_SUCCESSFUL';
    }
    return msgCode;
};
exports.getSuccessMsgCode = getSuccessMsgCode;
const getErrorMsgCode = (req) => {
    let msgCode;
    if ((req === null || req === void 0 ? void 0 : req.url.slice(1)) === 'signup') {
        msgCode = 'SIGNUP_FAILED';
    }
    else {
        msgCode = 'LOGIN_FAILED';
    }
    return msgCode;
};
exports.getErrorMsgCode = getErrorMsgCode;
const genUUID = () => {
    const uuid = (0, uuid_1.v4)();
    return uuid;
};
exports.genUUID = genUUID;
