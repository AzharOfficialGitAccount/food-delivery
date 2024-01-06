export enum UserType {
    OWNER = 1,
    USER = 2
}

export enum UserStatus {
    BLOCK = 'block',
    UNBLOCK = 'unblock'
}

export const ErrorMessage = {
    EXPIRED: 'jwt expired',
    INVALID: 'invalid signature'
} as const;

export const ErrorCode = {
    JWT_EXPIRED_CODE: 'JWT_EXPIRED',
    JWT_INVALID_CODE: 'JWT_INVALID',
    INVALID_ROUTE: 'INVALID_ROUTE'
} as const;

export enum DeviceType {
    Android = 1,
    IOS = 2,
    Web = 3
}

export type UserTypes = keyof typeof UserType;
export type UserStatuses = typeof UserStatus[keyof typeof UserStatus];
export type ErrorMessages = keyof typeof ErrorMessage;
export type ErrorCodes = keyof typeof ErrorCode;
export type DeviceTypes = keyof typeof DeviceType;
