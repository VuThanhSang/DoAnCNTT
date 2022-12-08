const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { getDB } = require('~/config/mongodb');
const { CollectionName } = require('~/utilities/constants');

const filesCollectionName = CollectionName.FILES_COLLECTION_NAME;
const filesCollectionSchema = Joi.object({
    studentId: Joi.string().required(),
    projectId: Joi.string().required(),
    files: Joi.array()
        .items(
            Joi.object({
                file: Joi.string(),
                contentType: Joi.string().default(null),
            }),
        )
        .required(),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
});

const validateSchema = async (data) => {
    return await filesCollectionSchema.validateAsync(data, { abortEarly: false });
};
const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(filesCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        console.log(data);
        const value = await validateSchema(data);
        await getDB()
            .collection('Projects')
            .findOneAndUpdate({ _id: ObjectId(data.projectId) }, { $set: { Status: true } });
        const result = await getDB().collection(filesCollectionName).insertOne(value);
        const getNewStudent = await findOneById(result.insertedId.toString());
        return getNewStudent;
    } catch (error) {
        throw new Error(error + '    model');
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now(),
        };
        await getDB()
            .collection(filesCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
        const GetColumnUpdate = await findOneById(id);
        return GetColumnUpdate;
    } catch (error) {
        throw new Error(error);
    }
};

export const FileReportModel = {
    createNew,
    update,
};
