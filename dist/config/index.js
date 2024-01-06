"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
const { env } = process;
let envFile = '.env';
if (env.NODE_ENV) {
    switch (env.NODE_ENV.toString().trim()) {
        case 'development':
            envFile = '.dev.env';
            break;
        case 'test':
            envFile = '.test.env';
            break;
        default:
            break;
    }
}
(0, dotenv_1.config)({ path: `./${envFile}`, debug: process.env.DEBUG === 'true' });
exports.config = {
    host: env.HOST,
    httpPort: env.HTTP_PORT,
    secret: env.SECRET,
    mongodbUserUri: env.MONGODB_USER_URI,
    expireIn: env.EXPIRE_IN,
    DB_USER_NAME: env.DB_USER_NAME,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_USER: env.DB_USER,
};
