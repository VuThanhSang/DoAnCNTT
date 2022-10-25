const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { getDB } = require('~/config/mongodb');
const { CollectionName } = require('~/utilities/constants');
const multer = require('multer');
const fs = require('fs');
//define Board collection
const studentCollectionName = CollectionName.STUDENT_COLLECTION_NAME;
const studentCollectionSchema = Joi.object({
    MSSV: Joi.string().min(3).max(20).default(null),
    Email: Joi.string().required(),
    FullName: Joi.string().default(null),
    PhoneNumber: Joi.string().min(10).max(10).default(null),
    Majors: Joi.string().default(null),
    Avatar: Joi.any().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await studentCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(studentCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const getFullStudent = async () => {
    const result = await getDB().collection(studentCollectionName).find({}).toArray();
    return result;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(studentCollectionName).insertOne(value);
        const getNewStudent = await findOneById(result.insertedId.toString());
        return getNewStudent;
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
            .collection(studentCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
        const GetColumnUpdate = await findOneById(id);
        return GetColumnUpdate;
    } catch (error) {
        throw new Error(error);
    }
};

export const StudentModel = { createNew, update, getFullStudent };
