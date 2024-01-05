import { v4 as uuidv4 } from 'uuid';

export const getPagination = (page: number = 1, size?: number): { limit: number; skip: number } => {
    const limit = size || 10;
    const skip = page ? (page - 1) * limit : 0;
    return { limit, skip };
};

export const getSuccessMsgCode = (req: any): string => {
    let msgCode;
    if (req.url.slice(1) === 'signup') {
        msgCode = 'SIGNUP_SUCCESSFUL';
    } else {
        msgCode = 'LOGIN_SUCCESSFUL';
    }

    return msgCode;
};

export const getErrorMsgCode = (req: any): string => {
    let msgCode;
    if (req?.url.slice(1) === 'signup') {
        msgCode = 'SIGNUP_FAILED';
    } else {
        msgCode = 'LOGIN_FAILED';
    }

    return msgCode;
};

export const genUUID = (): string => {
    const uuid = uuidv4();
    return uuid;
};
