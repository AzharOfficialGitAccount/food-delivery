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
exports.searchRestaurant = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurant = exports.restaurants = void 0;
const response = __importStar(require("../../response/index"));
const httpStatus = __importStar(require("http-status"));
const model = __importStar(require("../../model"));
const commonService = __importStar(require("../../services/common"));
const helper = __importStar(require("../../utils/helper"));
const restaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { menuId, name, contactNo, cuisine, openingHours, address, media, url } = req.body;
        const { Restaurant } = model;
        const id = (_a = req.data) === null || _a === void 0 ? void 0 : _a.id;
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
        const restaurantObj = yield commonService.create(Restaurant, userData);
        if (restaurantObj) {
            return response.success(req, res, { msgCode: 'RESTAURANT_CREATED', data: restaurantObj }, httpStatus.OK);
        }
        else {
            return response.error(req, res, { msgCode: 'RESTAURANT_CREATION_FAILED' }, httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.restaurants = restaurants;
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const ownerId = (_b = req.data) === null || _b === void 0 ? void 0 : _b.id;
        const { Restaurant } = model;
        const projects = { _id: 0, name: 1, contactNo: 1, cuisine: 1, openingHours: 1, address: 1, media: 1, url: 1 };
        const restaurant = yield commonService.getAll(Restaurant, { ownerId }, projects);
        if (!restaurant) {
            return response.error(req, res, { msgCode: 'RESTAURANT_NOT_FOUND' }, httpStatus.NOT_FOUND);
        }
        return response.success(req, res, { msgCode: 'PROFILE_FETCHED', data: restaurant }, httpStatus.OK);
    }
    catch (error) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.getRestaurant = getRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.data.userId;
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
        };
        const updatedRestaurant = yield commonService.updateByCondition(Restaurant, ownerId, updateDetail);
        if (!updatedRestaurant) {
            return response.error(req, res, { msgCode: 'RESTAURANT_NOT_UPDATED' }, httpStatus.NOT_FOUND);
        }
        return response.success(req, res, { msgCode: 'PROFILE_UPDATED', data: updatedRestaurant }, httpStatus.OK);
    }
    catch (error) {
        console.error(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Restaurant } = model;
        const ownerId = req.data.id;
        const deleteRestaurant = yield commonService.updateByCondition(Restaurant, { ownerId }, { isActive: false, isDeleted: true });
        if (!deleteRestaurant) {
            return response.error(req, res, { msgCode: 'FAILED_TO_DELETE' }, httpStatus.FORBIDDEN);
        }
        return response.success(req, res, { msgCode: 'RESTAURANT_DELETED', data: {} }, httpStatus.OK);
    }
    catch (error) {
        console.log(error);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
});
exports.deleteRestaurant = deleteRestaurant;
const searchRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Restaurant } = model;
    const { page = 1, pageLimit = 10, search } = req.query;
    const { skip, limit } = helper.getPagination(page, pageLimit);
    const aggregationPipeline = [];
    if (search) {
        const regexSearch = new RegExp(search.trim(), 'i');
        aggregationPipeline.push({
            $facet: {
                filteredDocs: [
                    { $match: { isDeleted: { $ne: true }, status: 'active' } },
                    { $project: { name: 1 } }
                ],
                nameSearch: [
                    { $match: { name: { $regex: regexSearch } } },
                    { $project: { _id: 0, name: 1 } }
                ]
            }
        });
        aggregationPipeline.push({
            $facet: {
                finalResult: [
                    { $project: { combinedResult: { $concatArrays: ['$filteredDocs', '$nameSearch'] } } },
                    { $unwind: '$combinedResult' },
                    { $replaceRoot: { newRoot: '$combinedResult' } }
                ]
            }
        });
    }
    aggregationPipeline.push({ $skip: skip || 0 }, { $limit: Number(limit) });
    try {
        const result = yield Restaurant.aggregate(aggregationPipeline);
        return response.success(req, res, { msgCode: 'PRODUCT_DETAILS', data: result }, httpStatus.OK);
    }
    catch (err) {
        console.log(err);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
    }
});
exports.searchRestaurant = searchRestaurant;
