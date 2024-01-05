"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = exports.connections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
const connections = {};
exports.connections = connections;
function createConnection(mongoUri) {
    if (connections[mongoUri]) {
        return connections[mongoUri];
    }
    console.log('mongoUri=============>', mongoUri);
    const connection = mongoose_1.default.createConnection(mongoUri);
    connection.on('connected', () => {
        console.log('Database connection established successfully');
    });
    connection.on('error', (err) => {
        console.log(`Database connection has occurred error: ${err}`);
    });
    connection.on('disconnected', () => {
        console.log(`Database Connection to "${mongoUri}" is disconnected`);
    });
    connections[mongoUri] = connection;
    return connection;
}
exports.createConnection = createConnection;
