import { Request, Response } from 'express';
import * as response from '../../response/index';
import * as httpStatus from 'http-status';
import * as model from '../../model';
import * as commonService from '../../services/common';
import * as mongoose from 'mongoose';

export const addMenu = async (req: Request, res: Response) => {
    try {
        const { itemName, description, price, category, restaurantId, isVegetarian, isVegan, isSpicy } = req.body;
        const { Menu, Restaurant } = model;
        const id: string = (req as any).data?.id;

        const checkRestaurantId = await commonService.getByCondition(Restaurant, { _id: restaurantId })
        if (!checkRestaurantId) {
            return response.error(req, res, { msgCode: 'RESTAURANT_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }

        const userData = {
            itemName,
            description,
            price,
            category,
            restaurantId,
            restaurantOwnerId: id,
            isVegetarian,
            isVegan,
            isSpicy
        };
        const menuObj = await commonService.create(Menu, userData);
        if (menuObj) {
            return response.success(req, res, { msgCode: 'MENU_CREATED', data: menuObj }, httpStatus.OK);
        } else {
            return response.error(req, res, { msgCode: 'MENU_CREATION_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const getMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantId, menuId, ownerId } = req.query;
        const { Menu } = model;

        if (ownerId || menuId || restaurantId) {
            const projects = { _id: 1, itemName: 1, description: 1, price: 1, category: 1, isVegetarian: 1, isVegan: 1, isSpicy: 1 };

            let condition: Record<string, any> = {};

            if (menuId) {
                condition = { _id: new mongoose.Types.ObjectId(menuId as string) };
            } else if (restaurantId) {
                condition = { restaurantId: new mongoose.Types.ObjectId(restaurantId as string) };
            } else if (ownerId) {
                condition = { restaurantOwnerId: new mongoose.Types.ObjectId(ownerId as string) };
            }

            const menu = await commonService.getByCondition(Menu, condition, projects);
            if (menu) {
                return <any>response.success(req, res, { msgCode: 'MENU_FETCHED', data: menu }, httpStatus.OK);
            } else {
                return <any>response.error(req, res, { msgCode: 'MENU_NOT_FOUND' }, httpStatus.NOT_FOUND);
            }
        } else {
            return <any>response.error(req, res, { msgCode: 'INVALID_REQUEST' }, httpStatus.BAD_REQUEST);
        }
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};


export const updateMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { menuId } = req.query;
        const { Menu } = model;
        const { itemName, description, price, category, restaurantId, isVegetarian, isVegan, isSpicy } = req.body;

        const updateDetail = {
            itemName,
            description,
            price,
            category,
            restaurantId,
            isVegetarian,
            isVegan,
            isSpicy
        };
        const updatedMenu = await commonService.updateByCondition(Menu, { _id: menuId }, updateDetail);
        if (!updatedMenu) {
            return <any>response.error(req, res, { msgCode: 'MENU_NOT_UPDATED' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'MENU_UPDATED', data: updatedMenu }, httpStatus.OK);
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const deleteMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Menu } = model;
        const { menuId } = req.query;

        const deleteMenu = await commonService.updateByCondition(Menu, { _id: menuId }, { isActive: false, isDeleted: true }
        );
        if (!deleteMenu) {
            return <any>response.error(req, res, { msgCode: 'FAILED_TO_DELETE' }, httpStatus.FORBIDDEN);
        }
        return <any>response.success(req, res, { msgCode: 'MENU_DELETED', data: {} }, httpStatus.OK);
    } catch (error) {
        console.log(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};
