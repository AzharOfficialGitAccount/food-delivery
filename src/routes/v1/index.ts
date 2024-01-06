import express from 'express';
import userRoutes from './user';
import RestaurantRoutes from './restaurant';


const app = express();

app.use('/user', userRoutes);
app.use('/restaurant', RestaurantRoutes);

export default app;
