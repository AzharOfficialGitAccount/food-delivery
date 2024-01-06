import Joi from 'joi';

const login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    deviceToken: Joi.string().required(),
    deviceId: Joi.string().required(),
    deviceType: Joi.string().default('web').optional()
});

const register = Joi.object({
    email: Joi.string().allow(''),
    userName: Joi.string().allow(''),
    mobile: Joi.number().allow(''),
    profilePic: Joi.string().allow(''),
    password: Joi.string().required(),
    roles: Joi.string().required(),
});

const restaurant = Joi.object({
    name: Joi.string().allow(''),
    contactNo: Joi.number().allow(''),
    address: Joi.string().allow(''),
    media: Joi.string().allow(''),
    url: Joi.string().allow(''),
});

const profile = Joi.object({
    email: Joi.string().allow(''),
    userName: Joi.string().allow(''),
    profilePic: Joi.string().allow(''),
    mobile: Joi.number().allow(),
    roles: Joi.string().allow()
});

export {
    login,
    register,
    profile,
    restaurant
};
