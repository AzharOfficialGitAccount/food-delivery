"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const http_1 = require("http");
// import { connections } from './app/config/database';
// import { errorHandler } from './app/middleware';
const cors_1 = require("cors");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(body_parser_1.default.json({ limit: '2mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
const httpServer = http_1.default.createServer(app);
httpServer.listen(process.env.PORT, () => {
    console.info(`Server up successfully - port: ${process.env.PORT}`);
});
app.use('/api', require('./app/routes/index'));
// app.use(errorHandler.methodNotAllowed);
// app.use(errorHandler.genericErrorHandler);
process.on('unhandledRejection', (err) => {
    console.error('Possibly unhandled rejection happened');
    if (err instanceof Error) {
        console.error(err.message);
    }
    else {
        console.error('Unhandled rejection:', err);
    }
});
// const closeHandler = () => {
//   Object.values(connections).forEach((connection: Connection | any) => {
//     if (typeof connection === 'object' && connection !== null) {
//       if (typeof connection.close === 'function') {
//         connection.close();
//       }
//     }
//   });
//   if (httpServer instanceof http.Server) {
//     httpServer.close(() => {
//       console.info('Server is stopped successfully');
//       process.exit(0);
//     });
//   }
// };
// process.on('SIGTERM', closeHandler);
// process.on('SIGINT', closeHandler);
