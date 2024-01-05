import { Document, Types } from 'mongoose';
import { Model } from '../model';

type Condition = Record<string, any>;
type ObjectId = Types.ObjectId;

const create = async (Model: Model<Document>, details: Record<string, any>) => {
    try {
        const data = await new Model(details).save();
        return data;
    } catch (err) {
        return false;
    }
};

const updateMany = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    content: Record<string, any>
): Promise<T | false> => {
    try {
        const data = await Model.updateMany(condition, { $set: content }, { new: true });
        return <any>data;
    } catch (err) {
        return false;
    }
};

const updateByCondition = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    content: Record<string, any>
): Promise<T | false> => {
    try {
        const data = await Model.findOneAndUpdate(condition, { $set: content }, { new: true });
        return <any>data;
    } catch (err) {
        return false;
    }
};

const updateSession = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    content: Record<string, any>,
    incCondition: Record<string, any>
): Promise<T | false> => {
    try {
        const data = await Model.findOneAndUpdate(condition, { $set: content, $inc: incCondition }, { new: true });
        return <any>data;
    } catch (err) {
        return false;
    }
};

const updateData = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    content: Record<string, any>
): Promise<T | false> => {
    try {
        const data = await Model.findOneAndUpdate(condition, { $set: content });
        return <any>data;
    } catch (err) {
        return false;
    }
};

const getById = async <T extends Document>(Model: Model<T>, id: ObjectId) => {
    try {
        const data = await Model.findById(id).lean();
        return data;
    } catch (error) {
        return false;
    }
};

const getByIdByLimit = async <T extends Document>(Model: Model<T>, id: ObjectId) => {
    try {
        const data = await Model.findById(id).limit(3);
        return data;
    } catch (error) {
        return false;
    }
};

const getByCondition = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    projection: Record<string, any> = {}
): Promise<T | null | false> => {
    try {
        const data = await Model.findOne(condition, projection).lean();
        return <any>data || null;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getAll = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    project: Record<string, any>
): Promise<T[] | null | false> => {
    try {
        const data = await Model.find(condition, project).sort({ createdAt: -1 }).lean();
        return <any>data || null;
    } catch (error) {
        return false;
    }
};

const getAllById = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    project: Record<string, any>
): Promise<T[] | null | false> => {
    try {
        const data = await Model.find(condition, project).lean();
        return <any>data || null;
    } catch (error) {
        return false;
    }
};

const removeById = async <T extends Document>(Model: Model<T>, id: ObjectId) => {
    try {
        const data = await Model.findByIdAndDelete(id);
        return data;
    } catch (error) {
        return false;
    }
};


const insertManyData = async <T extends Document>(Model: Model<T>, content: Record<string, any>[]) => {
    try {
        const data = await Model.insertMany(content);
        return data ? JSON.parse(JSON.stringify(data)) : null;
    } catch (err) {
        return false;
    }
};

const deleteByField = async <T extends Document>(Model: Model<T>, content: Condition) => {
    try {
        const data = await Model.findOneAndDelete(content);
        return data ? JSON.parse(JSON.stringify(data)) : null;
    } catch (error) {
        return false;
    }
};


const deleteAllByCondition = async <T extends Document>(Model: Model<T>, content: Condition) => {
    try {
        const data = await Model.deleteMany(content);
        return data || null;
    } catch (error) {
        return false;
    }
};

const count = async <T extends Document>(Model: Model<T>, condition: Condition) => {
    try {
        const data = await Model.countDocuments(condition);
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getList = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    projection: Record<string, any> = {}
): Promise<T[] | false> => {
    try {
        const data = await Model.find(condition, projection).lean();
        return <any>data;
    } catch (error) {
        return false;
    }
};

const findLast = async <T extends Document>(
    Model: Model<T>,
    projection: Record<string, any>
): Promise<T | false> => {
    try {
        const data = await Model.find({}, projection, { lean: true }).limit(1).sort({ $natural: -1 });
        return <any>data[0];
    } catch (error) {
        return false;
    }
};

const userProfile = async <T extends Document>(
    Model: Model<T>,
    condition: Condition,
    project: Record<string, any>
): Promise<T | null | false> => {
    try {
        const data = await Model.findOne(condition, project).lean();
        return <any>data || null;
    } catch (error) {
        console.log('error:', error);
        return false;
    }
};

export = {
    create,
    updateByCondition,
    getById,
    removeById,
    count,
    insertManyData,
    deleteByField,
    getByCondition,
    getList,
    getAll,
    getByIdByLimit,
    updateData,
    findLast,
    userProfile,
    getAllById,
    updateSession,
    deleteAllByCondition,
    updateMany,
};
