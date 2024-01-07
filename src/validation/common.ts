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
    address: Joi.string().allow()
});

const restaurant = Joi.object({
    name: Joi.string().allow(''),
    contactNo: Joi.number().allow(''),
    address: Joi.string().allow(''),
    media: Joi.string().allow(''),
    url: Joi.string().allow(''),
    cuisine: Joi.string().allow(''),
    openingHours: Joi.string().allow(''),
    menuId: Joi.string().allow()
});

const menu = Joi.object({
    itemName: Joi.string().allow(''),
    description: Joi.string().allow(''),
    price: Joi.number().allow(''),
    category: Joi.string().allow(''),
    restaurantId: Joi.string().allow(''),
    isVegetarian: Joi.boolean().allow(''),
    isVegan: Joi.boolean().allow(''),
    isSpicy: Joi.boolean().allow()
});

const menuQuery = Joi.object({
    ownerId: Joi.string().allow(),
    restaurantId: Joi.string().allow(),
    menuId: Joi.string().allow()
})

const profile = Joi.object({
    email: Joi.string().allow(''),
    userName: Joi.string().allow(''),
    profilePic: Joi.string().allow(''),
    mobile: Joi.number().allow(),
    roles: Joi.string().allow(),
    address: Joi.string().allow()
});

const order = Joi.object({
    restaurantId: Joi.string().allow(),
    menuId: Joi.string().allow()
});
const orderStatus = Joi.object({
    orderId: Joi.string().allow(),
    orderStatus: Joi.string().allow()
});

export {
    login,
    register,
    profile,
    restaurant,
    menu,
    menuQuery,
    order,
    orderStatus
};
