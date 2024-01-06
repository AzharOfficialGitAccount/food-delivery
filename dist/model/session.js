"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    deviceId: { type: String, required: true },
    deviceToken: { type: String, required: true },
    deviceType: { type: String, required: true },
    accessToken: { type: String, required: true },
});
const Session = (0, mongoose_1.model)('Session', SessionSchema);
exports.Session = Session;
