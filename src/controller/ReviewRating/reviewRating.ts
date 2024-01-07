import { Request, Response } from 'express';
import * as response from '../../response/index';
import * as httpStatus from 'http-status';
import * as model from '../../model';
import * as commonService from '../../services/common';
import * as commonConstant from '../../constant/common';


export const reviewRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ReviewRating, User } = model;
        const userId: string = (req as any).data?.id;
        const { driverId, restaurantId, rating, review } = req.body;

        const userType = await commonService.getByCondition(User, { _id: userId });

        if (!userType) {
            return <any>response.error(req, res, { msgCode: 'USER_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        if ([commonConstant.UserStatus.Owner, commonConstant.UserStatus.driver].includes(userType?.userStatus as commonConstant.UserStatuses || "")) {
            return <any>response.error(req, res, { msgCode: 'CANNOT_REVIEW_OWN' }, httpStatus.BAD_REQUEST);
        }
        const reviewData = {
            rating,
            review,
            targetType: commonConstant.targetType[driverId ? commonConstant.targetType.driver : commonConstant.targetType.restaurant],
            ...(driverId ? { driverId } : { restaurantId }),
        };
        const reviewObj = await commonService.create(ReviewRating, reviewData);
        if (reviewObj) {
            return <any>response.success(req, res, { msgCode: 'REVIEW_AND_RATING_SUBMITTED', data: reviewObj }, httpStatus.OK);
        } else {
            return <any>response.error(req, res, { msgCode: 'REVIEW_AND_RATING_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};


export const getRestaurantReviewRatings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ReviewRating } = model;
        const { restaurantId } = req.query;

        const projects = { _id: 0, rating: 1, review: 1, targetType: 1, restaurantId: 1 }

        const restaurantReview = await commonService.getAll(ReviewRating as any, { restaurantId }, projects);
        if (!restaurantReview) {
            return <any>response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'REVIEW_FETCHED', data: restaurantReview }, httpStatus.OK);
    } catch (error) {
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const getDriverReviewRatings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { driverId } = req.query;
        const { ReviewRating } = model;

        const projects = { _id: 0, rating: 1, review: 1, targetType: 1, driverId: 1 }

        const driverReview = await commonService.getAll(ReviewRating as any, { driverId }, projects);
        if (!driverReview) {
            return <any>response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'REVIEW_FETCHED', data: driverReview }, httpStatus.OK);
    } catch (error) {
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};
