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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.getByCondition = exports.updateByCondition = exports.create = void 0;
function create(Model, details) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield new Model(details).save();
            return data;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.create = create;
function updateByCondition(Model, condition, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Model.findOneAndUpdate(condition, { $set: content }, { new: true });
            return data;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.updateByCondition = updateByCondition;
function getByCondition(Model, condition, projection = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Model.findOne(condition, projection).lean();
            return data ? data : null;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    });
}
exports.getByCondition = getByCondition;
function userProfile(Model, condition, project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Model.findOne(condition, project).lean();
            return data ? data : null;
        }
        catch (error) {
            console.error('error:', error);
            return false;
        }
    });
}
exports.userProfile = userProfile;
