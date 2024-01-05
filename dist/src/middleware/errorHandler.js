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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.methodNotAllowed = exports.notFound = void 0;
const http_status_1 = __importDefault(require("http-status"));
const response = __importStar(require("../response/index"));
const notFound = (req, res) => {
    return response.error(req, res, {
        msgCode: 'NOT_FOUND'
    }, http_status_1.default.NOT_FOUND);
};
exports.notFound = notFound;
const methodNotAllowed = (req, res) => {
    return response.error(req, res, {
        msgCode: 'INVALID_ROUTE'
    }, http_status_1.default.METHOD_NOT_ALLOWED);
};
exports.methodNotAllowed = methodNotAllowed;
const genericErrorHandler = (err, req, res, next) => {
    if (!err) {
        return next();
    }
    let error;
    console.log(err);
    if (err.isJoi) {
        error = {
            code: http_status_1.default.BAD_REQUEST,
            message: http_status_1.default[http_status_1.default.BAD_REQUEST],
            details: err.details
                ? err.details.map((e) => ({
                    message: e.message,
                    param: e.path.join('.')
                }))
                : err.errors.map((e) => e.messages.join('. ')).join(' and ')
        };
    }
    else if (err.status === undefined && err.response && err.response.data) {
        const { data: responseData } = err.response;
        if (responseData) {
            ({ error } = responseData);
        }
    }
    else if (err.status !== undefined && err.status < 500) {
        error = {
            code: err.status,
            message: err.message
        };
        if (err.errors) {
            error.errors = err.errors;
        }
        else if (err.actionCode) {
            error.actionCode = err.actionCode;
        }
    }
    return response.error(req, res, { msgCode: error.message }, error.code);
};
exports.genericErrorHandler = genericErrorHandler;
