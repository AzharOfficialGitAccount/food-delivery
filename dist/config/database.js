"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
mongoose_1.default.Promise = global.Promise;
const connectionUri = index_1.config.mongodbUserUri;
if (!connectionUri) {
    throw new Error('MongoDB URI is not defined in the configuration.');
}
mongoose_1.default.connect(connectionUri);
const dbConnection = mongoose_1.default.connection;
exports.dbConnection = dbConnection;
dbConnection.on('connected', () => {
    console.log('Database connection established successfully');
});
dbConnection.on('error', (err) => {
    console.log(`Database connection has occurred error: ${err}`);
});
dbConnection.on('disconnected', () => {
    console.log(`Database Connection to "${connectionUri}" is disconnected`);
});
