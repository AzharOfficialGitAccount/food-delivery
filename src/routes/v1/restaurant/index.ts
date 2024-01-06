import express from 'express';
import * as restaurantController from '../../../controller/restaurant/restaurant';
import * as schema from '../../../validation/common';
import { reqValidator } from '../../../middleware/requestValidator';
import { verifyAuthToken } from '../../../middleware/auth';

const router = express.Router();

router.post('/restaurant', reqValidator(schema.restaurant), verifyAuthToken, restaurantController.restaurants);
router.get('/get-restaurant', verifyAuthToken, restaurantController.getRestaurant);
router.put('/update-restaurant', reqValidator(schema.restaurant), verifyAuthToken, restaurantController.updateRestaurant);
router.delete('/delete-restaurant', verifyAuthToken, restaurantController.deleteRestaurant);

export default router;
