import Joi from 'joi';

const login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    device_token: Joi.string().required(),
    device_id: Joi.string().required(),
    device_type: Joi.string().default('web').optional()
});

const addProfile = Joi.object({
    email: Joi.string().allow(''),
    userName: Joi.string().allow(''),
    profilePic: Joi.string().allow(''),
    dob: Joi.string().pattern(/(^0[1-9]|[1-9]|[12][0-9]|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(\d{4}$)/).message('Invalid DOB format').allow(''),
    gender: Joi.string().allow(''),
    state: Joi.string().allow('')
});

const updateProfile = Joi.object({
    email: Joi.string().email().min(5).max(256).message(
        'Email length should not be more than 256 characters.'
    ).required(),
    userName: Joi.string().required()
});

export {
    login,
    updateProfile,
    addProfile
};
