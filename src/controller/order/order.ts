import { Request, Response } from 'express';
import * as response from '../../response/index';
import * as httpStatus from 'http-status';
import * as model from '../../model';
import * as commonService from '../../services/common';
import { getSocketIO } from '../../webSockets/socket';

export const order = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Menu, Restaurant, User, Order } = model;
        const userId: string = (req as any).data?.id;

        const { restaurantId, menuId } = req.body;

        const user = await commonService.getByCondition(User, { _id: userId });
        if (!user) {
            return <any>response.error(req, res, { msgCode: 'USER_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        const restaurant = await commonService.getByCondition(Restaurant, { _id: restaurantId });
        if (!restaurant) {
            return <any>response.error(req, res, { msgCode: 'RESTAURANT_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        const menu = await commonService.getByCondition(Menu, { _id: menuId });
        if (!menu) {
            return <any>response.error(req, res, { msgCode: 'MENU_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }

        const menuDetails = [{
            menuId: menu._id,
            price: menu.price,
            itemName: menu.itemName,
        }];
        const orderData = {
            menuDetails,
            userDetails: [{
                userId: user._id,
                email: user.email,
                userName: user.userName,
                mobile: user.mobile,
                address: user.address,
            }],
            restaurantDetails: [{
                restaurantId: restaurant._id,
                name: restaurant.name,
                address: restaurant.address,
            }],
            totalAmount: 0,
        };
        const totalAmount = menuDetails.reduce((total: any, menu: any) => total + (menu.price || 0), 0);
        orderData.totalAmount = totalAmount;

        const order = await commonService.create(Order, orderData);
        if (order) {
            return <any>response.success(req, res, { msgCode: 'ORDER_PLACED', data: { ...order.toObject(), totalAmount } }, httpStatus.OK);
        } else {
            return <any>response.error(req, res, { msgCode: 'ORDER_PLACEMENT_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { Order } = model;
        const { orderId, orderStatus } = req.body;

        const updateDetail = { orderStatus }
        const updatedStatus = await commonService.updateByCondition(Order, { _id: orderId }, updateDetail);
        if (!updatedStatus) {
            return <any>response.error(req, res, { msgCode: 'STATUS_NOT_UPDATED' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'UPDATED', data: updatedStatus }, httpStatus.OK);
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const trackOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = (req as any).data?.id;
        const { Order } = model;

        const projects = { orderStatus: 1 }

        const restaurant = await commonService.getAll(Order as any, { 'userDetails.userId': userId, }, projects);
        if (!restaurant) {
            return <any>response.error(req, res, { msgCode: 'RESTAURANT_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'PROFILE_FETCHED', data: restaurant }, httpStatus.OK);
    } catch (error) {
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = (req as any).data?.id;
        const { Order } = model;

        const projection = {
            orderStatus: 1,
            totalAmount: 1,
            menuDetails: 1,
            userDetails: 1,
            restaurantDetails: 1,
            createdAt: 1,
            updatedAt: 1,
        };

        const orders = await commonService.getAll(Order as any, { 'userDetails.userId': userId }, projection);

        if (!orders || orders?.length === 0) {
            return <any>response.error(req, res, { msgCode: 'ORDERS_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return <any>response.success(req, res, { msgCode: 'ORDERS_FETCHED', data: orders }, httpStatus.OK);
    } catch (error) {
        console.error(error);
        return <any>response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const notifyOrderStatus = async (req: Request, res: Response): Promise<void> => {
    const { Order } = model;
    const { orderId, orderStatus } = req.body;

    const updateDetail = { orderStatus };
    const updatedStatus = await commonService.updateByCondition(Order, { _id: orderId }, updateDetail);
    if (!updatedStatus) {
        return <any>response.error(req, res, { msgCode: 'STATUS_NOT_UPDATED' }, httpStatus.NOT_FOUND);
    }

    const io = getSocketIO();
    io.emit(`order-status-${orderId}`, { status: orderStatus });

    return <any>response.success(req, res, { msgCode: 'UPDATED', data: updatedStatus }, httpStatus.OK);
};




