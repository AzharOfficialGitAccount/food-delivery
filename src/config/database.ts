import mongoose, { Connection } from 'mongoose';
import { config } from '../config/index';

mongoose.Promise = global.Promise;

const connectionUri = config.mongodbUserUri;

if (!connectionUri) {
  throw new Error('MongoDB URI is not defined in the configuration.');
}

const connection = mongoose.createConnection(connectionUri);

connection.on('connected', () => {
  console.log('Database connection established successfully');
});

connection.on('error', (err) => {
  console.log(`Database connection has occurred error: ${err}`);
});

connection.on('disconnected', () => {
  console.log(`Database Connection to "${connectionUri}" is disconnected`);
});

const connections: Record<string, Connection> = {};
connections[connectionUri] = connection;

export { connections };
