import { Model as MongooseModel, Document } from 'mongoose';
import User, { UserDocument } from './user';
import Session, { SessionDocument } from './session';

export {
    User,
    Session,
};

export type Model<T extends Document> = MongooseModel<T>;
export type UserModel = Model<UserDocument>;
export type SessionModel = Model<SessionDocument>;

const model = {
    User,
    Session,
};

export default model;
