import Joi from 'joi';

const login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    device_token: Joi.string().required(),
    device_id: Joi.string().required(),
    device_type: Joi.string().default('web').optional()
});

const register = Joi.object({
    email: Joi.string().allow(''),
    mobile: Joi.number().allow(''),
    profilePic: Joi.string().allow(''),
    password: Joi.string().required(),
    userType: Joi.number().optional(),
});


export {
    login,
    register
};
