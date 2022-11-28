const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { getDB } = require('~/config/mongodb');
const { CollectionName } = require('~/utilities/constants');
//define Board collection
const lectureCollectionName = CollectionName.LECTURE_COLLECTION_NAME;
const lectureCollectionSchema = Joi.object({
    Email: Joi.string().required(),
    FullName: Joi.string().default(null),
    PhoneNumber: Joi.string().min(10).max(10).default(null),
    Password: Joi.string().required(),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await lectureCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(lectureCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const getFullLecture = async () => {
    const result = await getDB().collection(lectureCollectionName).find({}).toArray();
    console.log(result);
    return result;
};

const search = async (data) => {
    try {
        const result = await getDB()
            .collection(lectureCollectionName)
            .find({ $or: [{ FullName: { $regex: data } }, { Email: { $regex: data } }] })
            .toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(lectureCollectionName).insertOne(value);
        const getNewLecture = await findOneById(result.insertedId.toString());
        return getNewLecture;
    } catch (error) {
        throw new Error(error);
    }
};
const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
        };
        await getDB()
            .collection(lectureCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
        const GetColumnUpdate = await findOneById(id);
        return GetColumnUpdate;
    } catch (error) {
        throw new Error(error);
    }
};

const login = async (data) => {
    try {
        const result = await getDB()
            .collection(lectureCollectionName)
            .findOne({ Email: data.email, Password: data.password });
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const LectureModel = { createNew, update, getFullLecture, search, login };
