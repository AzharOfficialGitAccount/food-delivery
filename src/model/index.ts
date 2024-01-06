import { Model as MongooseModel, Document } from 'mongoose';
import User, { UserDocument } from './user';
import { Session, SessionDocument } from './session';
import Restaurant, { RestaurantDocument } from './restaurant';
import Menu, { MenuDocument } from './menu';
import Order, { OrderDocument } from './order';

export { User, Session, Restaurant, Menu, Order };

export type Model<T extends Document> = MongooseModel<T>;

export type UserModel = Model<UserDocument>;
export type SessionModel = Model<SessionDocument>;
export type RestaurantModel = Model<RestaurantDocument>;
export type MenuModel = Model<MenuDocument>;
export type OrderModel = Model<OrderDocument>;

export interface Models {
    User: UserModel;
    Session: SessionModel;
    Restaurant: RestaurantModel;
    Menu: MenuModel;
    Order: OrderModel;
}

const models: Models = {
    User,
    Session,
    Restaurant,
    Menu,
    Order
};

export default models;
