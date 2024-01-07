"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.updateMenu = exports.getMenu = exports.addMenu = void 0;
const response = __importStar(require("../../response/index"));
const httpStatus = __importStar(require("http-status"));
const model = __importStar(require("../../model"));
const commonService = __importStar(require("../../services/common"));
const mongoose = __importStar(require("mongoose"));
const addMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { itemName, description, price, category, restaurantId, isVegetarian, isVegan, isSpicy } = req.body;
        const { Menu, Restaurant } = model;
        const id = (_a = req.data) === null || _a === void 0 ? void 0 : _a.id;
        const checkRestaurantId = yield commonService.getByCondition(Restaurant, { _id: restaurantId });
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
        const menuObj = yield commonService.create(Menu, userData);
        if (menuObj) {
            return response.success(req, res, { msgCode: 'MENU_CREATED', data: menuObj }, httpStatus.OK);
        }
        else {
            return response.error(req, res, { msgCode: 'MENU_CREATION_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.addMenu = addMenu;
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId, menuId, ownerId } = req.query;
        const { Menu } = model;
        if (ownerId || menuId || restaurantId) {
            const projects = { itemName: 1, description: 1, price: 1, category: 1, isVegetarian: 1, isVegan: 1, isSpicy: 1 };
            let condition = {};
            if (menuId) {
                condition = { _id: new mongoose.Types.ObjectId(menuId) };
            }
            else if (restaurantId) {
                condition = { restaurantId: new mongoose.Types.ObjectId(restaurantId) };
            }
            else if (ownerId) {
                condition = { restaurantOwnerId: new mongoose.Types.ObjectId(ownerId) };
            }
            const menu = yield commonService.getByCondition(Menu, condition, projects);
            if (menu) {
                return response.success(req, res, { msgCode: 'MENU_FETCHED', data: menu }, httpStatus.OK);
            }
            else {
                return response.error(req, res, { msgCode: 'MENU_NOT_FOUND' }, httpStatus.NOT_FOUND);
            }
        }
        else {
            return response.error(req, res, { msgCode: 'INVALID_REQUEST' }, httpStatus.BAD_REQUEST);
        }
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.getMenu = getMenu;
const updateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedMenu = yield commonService.updateByCondition(Menu, { _id: menuId }, updateDetail);
        if (!updatedMenu) {
            return response.error(req, res, { msgCode: 'MENU_NOT_UPDATED' }, httpStatus.NOT_FOUND);
        }
        return response.success(req, res, { msgCode: 'MENU_UPDATED', data: updatedMenu }, httpStatus.OK);
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.updateMenu = updateMenu;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Menu } = model;
        const { menuId } = req.query;
        const deleteMenu = yield commonService.updateByCondition(Menu, { _id: menuId }, { isActive: false, isDeleted: true });
        if (!deleteMenu) {
            return response.error(req, res, { msgCode: 'FAILED_TO_DELETE' }, httpStatus.FORBIDDEN);
        }
        return response.success(req, res, { msgCode: 'MENU_DELETED', data: {} }, httpStatus.OK);
    }
    catch (error) {
        console.log(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteMenu = deleteMenu;
