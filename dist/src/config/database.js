"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
mongoose_1.default.Promise = global.Promise;
const connectionUri = index_1.config.mongodbUserUri;
if (!connectionUri) {
    throw new Error('MongoDB URI is not defined in the configuration.');
}
const connection = mongoose_1.default.createConnection(connectionUri);
connection.on('connected', () => {
    console.log('Database connection established successfully');
});
connection.on('error', (err) => {
    console.log(`Database connection has occurred error: ${err}`);
});
connection.on('disconnected', () => {
    console.log(`Database Connection to "${connectionUri}" is disconnected`);
});
const connections = {};
exports.connections = connections;
connections[connectionUri] = connection;
