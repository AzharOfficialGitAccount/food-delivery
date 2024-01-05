"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const create = (Model, details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield new Model(details).save();
        return data;
    }
    catch (err) {
        return false;
    }
});
const updateMany = (Model, condition, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.updateMany(condition, { $set: content }, { new: true });
        return data;
    }
    catch (err) {
        return false;
    }
});
const updateByCondition = (Model, condition, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findOneAndUpdate(condition, { $set: content }, { new: true });
        return data;
    }
    catch (err) {
        return false;
    }
});
const updateSession = (Model, condition, content, incCondition) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findOneAndUpdate(condition, { $set: content, $inc: incCondition }, { new: true });
        return data;
    }
    catch (err) {
        return false;
    }
});
const updateData = (Model, condition, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findOneAndUpdate(condition, { $set: content });
        return data;
    }
    catch (err) {
        return false;
    }
});
const getById = (Model, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findById(id).lean();
        return data;
    }
    catch (error) {
        return false;
    }
});
const getByIdByLimit = (Model, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findById(id).limit(3);
        return data;
    }
    catch (error) {
        return false;
    }
});
const getByCondition = (Model, condition, projection = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findOne(condition, projection).lean();
        return data || null;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
const getAll = (Model, condition, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.find(condition, project).sort({ createdAt: -1 }).lean();
        return data || null;
    }
    catch (error) {
        return false;
    }
});
const getAllById = (Model, condition, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.find(condition, project).lean();
        return data || null;
    }
    catch (error) {
        return false;
    }
});
const removeById = (Model, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findByIdAndDelete(id);
        return data;
    }
    catch (error) {
        return false;
    }
});
const insertManyData = (Model, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.insertMany(content);
        return data ? JSON.parse(JSON.stringify(data)) : null;
    }
    catch (err) {
        return false;
    }
});
const deleteByField = (Model, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findOneAndDelete(content);
        return data ? JSON.parse(JSON.stringify(data)) : null;
    }
    catch (error) {
        return false;
    }
});
const deleteAllByCondition = (Model, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.deleteMany(content);
        return data || null;
    }
    catch (error) {
        return false;
    }
});
const count = (Model, condition) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.countDocuments(condition);
        return data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
const getList = (Model, condition, projection = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.find(condition, projection).lean();
        return data;
    }
    catch (error) {
        return false;
    }
});
const findLast = (Model, projection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.find({}, projection, { lean: true }).limit(1).sort({ $natural: -1 });
        return data[0];
    }
    catch (error) {
        return false;
    }
});
const userProfile = (Model, condition, project) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Model.findOne(condition, project).lean();
        return data || null;
    }
    catch (error) {
        console.log('error:', error);
        return false;
    }
});
module.exports = {
    create,
    updateByCondition,
    getById,
    removeById,
    count,
    insertManyData,
    deleteByField,
    getByCondition,
    getList,
    getAll,
    getByIdByLimit,
    updateData,
    findLast,
    userProfile,
    getAllById,
    updateSession,
    deleteAllByCondition,
    updateMany,
};
