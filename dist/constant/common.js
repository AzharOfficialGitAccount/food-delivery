"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceType = exports.ErrorCode = exports.ErrorMessage = exports.UserStatus = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["OWNER"] = "Owner";
    UserType["USER"] = "customer";
})(UserType || (exports.UserType = UserType = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["BLOCK"] = "block";
    UserStatus["UNBLOCK"] = "unblock";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
exports.ErrorMessage = {
    EXPIRED: 'jwt expired',
    INVALID: 'invalid signature'
};
exports.ErrorCode = {
    JWT_EXPIRED_CODE: 'JWT_EXPIRED',
    JWT_INVALID_CODE: 'JWT_INVALID',
    INVALID_ROUTE: 'INVALID_ROUTE'
};
var DeviceType;
(function (DeviceType) {
    DeviceType["Android"] = "Android";
    DeviceType["IOS"] = "ios";
    DeviceType["Web"] = "web";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
