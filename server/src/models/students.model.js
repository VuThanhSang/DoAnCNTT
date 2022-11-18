const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { getDB } = require('~/config/mongodb');
const { CollectionName } = require('~/utilities/constants');
const fs = require('fs');
//define Board collection
const studentCollectionName = CollectionName.STUDENT_COLLECTION_NAME;
const studentCollectionSchema = Joi.object({
    MSSV: Joi.string().min(3).max(20).default(null),
    Email: Joi.string().required(),
    FullName: Joi.string().default(null),
    PhoneNumber: Joi.string().min(10).max(10).default(null),
    Majors: Joi.string().default(null),
    Avatar: Joi.object({
        img: Buffer,
        contentType: Joi.string().default(null),
    }).default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await studentCollectionSchema.validateAsync(data, { abortEarly: false });
};

const search = async (data) => {
    try {
        const queryName = new RegExp(data) || '';
        const queryEmail = new RegExp(data) || '';
        const result = await getDB()
            .collection(studentCollectionName)
            .find({
                $or: [
                    {
                        FullName: queryName,
                    },
                    {
                        Email: queryEmail,
                    },
                ],
            })
            .toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
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

const registerMajors = async (id, data) => {
    try {
        await getDB()
            .collection(studentCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { Majors: data } });
        const getDataUpdate = await findOneById(id);
        return getDataUpdate;
    } catch (error) {
        throw new Error(error);
    }
};

const listStudentOfMajors = async (majorsName) => {
    try {
        const result = await getDB().collection(studentCollectionName).find({ Majors: majorsName }).toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getRegistrationHistory = async (id) => {
    try {
        const result = await getDB()
            .collection('Registration History')
            .aggregate([
                { $match: { idStudent: id } },
                { $addFields: { _idProject: { $toObjectId: '$idProject' } } },
                {
                    $lookup: {
                        from: 'Projects',
                        localField: '_idProject',
                        foreignField: '_id',
                        as: 'ProjectDetails',
                    },
                },
            ])
            .toArray();
        return result;
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

export const StudentModel = {
    createNew,
    update,
    getFullStudent,
    search,
    registerMajors,
    listStudentOfMajors,
    getRegistrationHistory,
};
