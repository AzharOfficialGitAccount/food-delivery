import express from 'express';
import userRoutes from './user';
import RestaurantRoutes from './restaurant';
import MenuRoutes from './menu';
import OrderRoutes from './order';


const app = express();

app.use('/user', userRoutes);
app.use('/restaurant', RestaurantRoutes);
app.use('/menu', MenuRoutes);
app.use('/order', OrderRoutes)

export default app;
