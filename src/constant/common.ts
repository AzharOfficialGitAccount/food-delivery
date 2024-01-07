export enum UserType {
    OWNER = 'Owner',
    USER = 'user'
}

export enum targetType {
    restaurant = 'restaurant',
    driver = 'driver'
}

export enum UserStatus {
    Owner = 'restaurant_owner',
    driver = 'driver'
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
    Android = 'Android',
    IOS = 'ios',
    Web = 'web'
}

export type UserTypes = keyof typeof UserType;
export type UserStatuses = typeof UserStatus[keyof typeof UserStatus];
export type ErrorMessages = keyof typeof ErrorMessage;
export type ErrorCodes = keyof typeof ErrorCode;
export type DeviceTypes = keyof typeof DeviceType;
export type targetTypes = keyof typeof targetType;

