"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceType = exports.Gender = exports.ErrorCode = exports.ErrorMessage = exports.UserStatus = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType[UserType["OWNER"] = 1] = "OWNER";
    UserType[UserType["USER"] = 2] = "USER";
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
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Android"] = 1] = "Android";
    DeviceType[DeviceType["IOS"] = 2] = "IOS";
    DeviceType[DeviceType["Web"] = 3] = "Web";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
