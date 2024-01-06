import { Request, Response } from 'express';
import * as response from '../../response/index';
import * as httpStatus from 'http-status';
import * as model from '../../model';
import * as commonService from '../../services/common';
import * as passwordHash from '../../utils/password';
import * as commonConstant from '../../constant/common';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, mobile, profilePic, password } = req.body;
        const { User } = model;

        const userData = {
            email: email.toLowerCase(),
            mobile,
            profilePic,
            password: await passwordHash.generateHash(password),
            userType: commonConstant.UserType.USER,
        };
        const userObj = await commonService.create(User, userData);
        return response.success(req, res, { msgCode: 'USER_CREATED', data: userObj }, httpStatus.OK);
    } catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

