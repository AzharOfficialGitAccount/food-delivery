import { config as dotenvConfig } from 'dotenv';
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

dotenvConfig({ path: `./${envFile}`, debug: process.env.DEBUG === 'true' });

export const config = {
  host: env.HOST,
  httpPort: env.HTTP_PORT,
  secret: env.SECRET,
  mongodbUserUri: env.MONGODB_USER_URI,
  expireIn: env.EXPIRE_IN,

  DB_USER_NAME: env.DB_USER_NAME,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_USER: env.DB_USER,
};
