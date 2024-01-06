import express from 'express';
import userRoutes from './user';
import RestaurantRoutes from './restaurant';
import Menu from './menu';


const app = express();

app.use('/user', userRoutes);
app.use('/restaurant', RestaurantRoutes);
app.use('/menu', Menu)

export default app;
