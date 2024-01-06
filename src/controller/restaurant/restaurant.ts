import { Request, Response } from 'express';
import * as response from '../../response/index';
import * as httpStatus from 'http-status';
import * as model from '../../model';
import * as commonService from '../../services/common';

export const restaurants = async (req: Request, res: Response) => {
    try {
        const { menuId, name, contactNo, cuisine, openingHours, address, media, url } = req.body;
        const { Restaurant } = model;
        const id: string = (req as any).data?.id;

        const userData = {
            name,
            contactNo,
            cuisine,
            openingHours,
            ownerId: id,
            menuId,
            address,
            media,
            url
        };
        const restaurantObj = await commonService.create(Restaurant, userData);
        if (restaurantObj) {
            return response.success(req, res, { msgCode: 'RESTAURANT_CREATED', data: restaurantObj }, httpStatus.OK);
        } else {
            return response.error(req, res, { msgCode: 'RESTAURANT_CREATION_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const getRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId: string = (req as any).data?.id;
        const { Restaurant } = model;

        const projects = { _id: 1, name: 1, contactNo: 1, cuisine: 1, openingHours: 1, address: 1, media: 1, url: 1 }
        const restaurant = await commonService.getByCondition(Restaurant, { ownerId }, projects);

        if (!restaurant) {
            return <any>response.error(req, res, { msgCode: 'RESTAURANT_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'PROFILE_FETCHED', data: restaurant }, httpStatus.OK);
    } catch (error) {
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};


export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId = (req as any).data.userId;
        const { Restaurant } = model;
        const { name, contactNo, openingHours, cuisine, address, media, url } = req.body;

        const updateDetail = {
            name,
            contactNo,
            cuisine,
            openingHours,
            address,
            media,
            url
        }
        const updatedRestaurant = await commonService.updateByCondition(Restaurant, ownerId, updateDetail);
        if (!updatedRestaurant) {
            return <any>response.error(req, res, { msgCode: 'RESTAURANT_NOT_UPDATED' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'PROFILE_UPDATED', data: updatedRestaurant }, httpStatus.OK);
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Restaurant } = model;
        const ownerId = (req as any).data.id;

        const deleteRestaurant = await commonService.updateByCondition(Restaurant, { ownerId }, { isActive: false, isDeleted: true }
        );
        if (!deleteRestaurant) {
            return <any>response.error(req, res, { msgCode: 'FAILED_TO_DELETE' }, httpStatus.FORBIDDEN);
        }
        return <any>response.success(req, res, { msgCode: 'RESTAURANT_DELETED', data: {} }, httpStatus.OK);
    } catch (error) {
        console.log(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};
