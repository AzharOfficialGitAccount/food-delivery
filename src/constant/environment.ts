export const env = {
    PORT: process.env.PORT,
    MONGODB_USER_URI: process.env.MONGODB_USER_URI,
    NODE_ENV: process.env.NODE_ENV,
    API_KEY: process.env.API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
    SALT_ROUND: process.env.SALT_ROUND,
};

export const serverType = {
    DEVELOPMENT: 'DEVELOPMENTS',
    STAGE: 'STAGE',
    TEST: 'TEST',
    PRODUCTION: 'PRODUCTION'
};
