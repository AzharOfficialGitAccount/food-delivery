import { Document, Model, FilterQuery } from 'mongoose';

type Condition = Record<string, any>;

export async function create<T extends Document>(
    Model: Model<T>,
    details: Record<string, any>
): Promise<T | false> {
    try {
        const data = await new Model(details).save();
        return data as T;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function updateByCondition<T extends Document>(
    Model: Model<T>,
    condition: Condition,
    content: Record<string, any>
): Promise<T | false> {
    try {
        const data = await Model.findOneAndUpdate(condition, { $set: content }, { new: true });
        return data as T;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function getByCondition<T extends Document>(
    Model: Model<T>,
    condition: Condition,
    projection: Record<string, any> = {}
): Promise<T | null | false> {
    try {
        const data = await Model.findOne(condition, projection).lean();
        return data ? (data as T) : null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteAllByCondition<T extends Document>(
    Model: Model<T>,
    conditions: FilterQuery<T>
): Promise<number | null> {
    try {
        const data = await Model.deleteMany(conditions);
        return data.deletedCount || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteByField<T extends Document>(
    Model: Model<T>,
    conditions: FilterQuery<T>
): Promise<T | null> {
    try {
        const data = await Model.findOneAndDelete(conditions);
        return data ? JSON.parse(JSON.stringify(data)) : null;
    } catch (error) {
        return null;
    }
}

interface BaseModel extends Document {
    createdAt: Date;
}

export async function getAll<T extends BaseModel>(
    Model: Model<T>,
    condition: Record<string, any>,
    project: Record<string, any>
): Promise<T[] | null> {
    try {
        const data = await Model.find(condition, project).sort({ createdAt: -1 }).lean();
        return data ? JSON.parse(JSON.stringify(data)) : null;
    } catch (error) {
        return null;
    }
}








