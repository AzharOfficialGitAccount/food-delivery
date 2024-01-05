"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("../constant/common");
const userTypes = Object.values(common_1.UserType);
const userGenders = Object.values(common_1.Gender);
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    password: {
        type: String
    },
    profilePic: {
        type: String
    },
    userType: {
        type: Number,
        enum: userTypes,
        default: common_1.UserType.USER
    },
    gender: {
        type: String,
        enum: userGenders
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    jwt: [{
            type: String
        }]
}, {
    timestamps: true,
    versionKey: false
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
