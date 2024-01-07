"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvalidTokenError = exports.sendNoDataSuccess = exports.sendPasswordMismatch = exports.success = exports.errorNotFound = exports.error = void 0;
const http_status_1 = __importDefault(require("http-status"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const basename = path_1.default.basename(__filename);
const lngMsg = {};
fs_1.default.readdirSync(path_1.default.join(__dirname, 'lng')).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-5) === '.json');
}).forEach(file => {
    const fileName = file.slice(0, -5);
    const lng = require(path_1.default.join(__dirname, 'lng', file));
    lngMsg[fileName] = lng;
});
const jsonResponse = (res, data, code) => {
    return res.status(code).json(data);
};
const error = (req, res, error, code = 500) => {
    const lng = req.headers['accept-language'] || 'en';
    const response = {
        success: false,
        message: 'failure',
        result: {
            code,
            message: (lngMsg[lng] ? lngMsg[lng][error.msgCode] : lngMsg.en[error.msgCode]) || error.msgCode || http_status_1.default[code],
        },
        time: Date.now(),
    };
    return jsonResponse(res, response, code);
};
exports.error = error;
const errorNotFound = (req, res, error, code = 500) => {
    const lng = req.headers['accept-language'] || 'en';
    const response = {
        success: false,
        message: 'failure',
        result: {
            code,
            message: (lngMsg[lng] ? lngMsg[lng][error.msgCode] : lngMsg.en[error.msgCode]) || error.msgCode || http_status_1.default[code],
        },
        time: Date.now(),
    };
    const errorCode = 200;
    return jsonResponse(res, response, errorCode || 200);
};
exports.errorNotFound = errorNotFound;
const success = (req, res, result, code = 201) => {
    const lng = req.headers['accept-language'] || 'en';
    const response = {
        success: true,
        message: 'success',
        result: {
            code,
            message: (lngMsg[lng] ? lngMsg[lng][result.msgCode] : lngMsg.en[result.msgCode]) || http_status_1.default[code],
            data: result.data,
        },
        time: Date.now(),
    };
    const errorCode = 201;
    return jsonResponse(res, response, errorCode || 201);
};
exports.success = success;
const sendPasswordMismatch = (req, res, result, code = 401) => {
    const lng = req.headers['accept-language'] || 'en';
    const response = {
        success: false,
        message: 'failure',
        result: {
            code,
            message: (lngMsg[lng] ? lngMsg[lng][result.msgCode] : lngMsg.en[result.msgCode]) || http_status_1.default[code],
            data: result.data,
        },
        time: Date.now(),
    };
    const errorCode = 401;
    return jsonResponse(res, response, errorCode || 401);
};
exports.sendPasswordMismatch = sendPasswordMismatch;
const sendNoDataSuccess = (req, res, result, code = 200) => {
    const lng = req.headers['accept-language'] || 'en';
    const response = {
        success: false,
        message: 'success',
        result: {
            code,
            message: (lngMsg[lng] ? lngMsg[lng][result.msgCode] : lngMsg.en[result.msgCode]) || http_status_1.default[code],
            data: result.data,
        },
        time: Date.now(),
    };
    const errorCode = 200;
    return jsonResponse(res, response, errorCode || 200);
};
exports.sendNoDataSuccess = sendNoDataSuccess;
const sendInvalidTokenError = (req, res, error, code = 401) => {
    const lng = req.headers['accept-language'] || 'en';
    const response = {
        success: false,
        message: 'failure',
        result: {
            code,
            message: (lngMsg[lng] ? lngMsg[lng][error.msgCode] : lngMsg.en[error.msgCode]) || error.msgCode || http_status_1.default[code],
        },
        time: Date.now()
    };
    const errorCode = 401;
    res.status(errorCode || 401).json(response);
};
exports.sendInvalidTokenError = sendInvalidTokenError;
