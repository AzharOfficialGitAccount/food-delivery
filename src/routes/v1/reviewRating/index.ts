import express from 'express';
import * as reviewRatingController from '../../../controller/ReviewRating/reviewRating';
import * as schema from '../../../validation/common';
import { reqValidator } from '../../../middleware/requestValidator';
import { verifyAuthToken } from '../../../middleware/auth';

const router = express.Router();

router.post('/review-ratings', reqValidator(schema.reviewRating), verifyAuthToken, reviewRatingController.reviewRating);
router.get('/restaurant-ratings', verifyAuthToken, reviewRatingController.getRestaurantReviewRatings);
router.get('/driver-ratings', verifyAuthToken, reviewRatingController.getDriverReviewRatings);

export default router;
