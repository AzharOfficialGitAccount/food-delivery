"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("../constant/common");
const sessionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    deviceId: {
        type: String,
    },
    deviceType: {
        type: Number,
        enum: [common_1.DeviceType.Android, common_1.DeviceType.IOS, common_1.DeviceType.Web],
    },
    deviceToken: {
        type: String,
    },
    accessToken: {
        type: String,
    },
    lastLoginDate: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Session = (0, mongoose_1.model)('sessions', sessionSchema);
exports.default = Session;
