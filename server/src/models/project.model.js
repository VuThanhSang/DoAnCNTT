const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { getDB } = require('~/config/mongodb');
const { CollectionName } = require('~/utilities/constants');

const projectCollectionName = CollectionName.PROJECT_COLLECTION_NAME;
const projectCollectionSchema = Joi.object({
    Name: Joi.string().required(),
    Instructor: Joi.string().required(),
    Status: Joi.boolean().default(false),
    Goal: Joi.string().default(null),
    Require: Joi.string().default(null),
    Product: Joi.string().default(null),
    Note: Joi.string().default(null),
    TotalStudents: Joi.number().default(0),
    OtherMajorsRegister: Joi.boolean().default(false),
    Majors: Joi.string().default(null),
    ProjectType: Joi.object({ TypeName: Joi.string().default(null), TypeId: Joi.string().default(null) }),
    Year: Joi.date().default(Date.now()),
    Leader: Joi.string().default(null),
    Member: Joi.array().items(Joi.string()).default([]),
    LectureCounterArgument: Joi.string().default(null),
    Score: Joi.string().default('Chưa có điểm'),
});

const registrationHistorySchema = Joi.object({
    idStudent: Joi.string().required(),
    idProject: Joi.string().required(),
    registeredDate: Joi.date().timestamp().default(Date.now()),
});
const validateSchemaRH = async (data) => {
    return await registrationHistorySchema.validateAsync(data, { abortEarly: false });
};
const validateSchema = async (data) => {
    return await projectCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(projectCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const search = async (data) => {
    try {
        const result = await getDB()
            .collection(projectCollectionName)
            .find({
                $or: [
                    {
                        Name: { $regex: data },
                    },
                    {
                        Instructor: { $regex: data },
                    },
                ],
            })
            .toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullProject = async () => {
    const result = await getDB().collection(projectCollectionName).find({}).toArray();

    return result;
};
const getProjectTypeList = async () => {
    const result = await getDB()
        .collection(projectCollectionName)
        .aggregate([{ $group: { _id: { ProjectType: '$ProjectType' }, count: { $sum: 1 } } }])
        .toArray();
    return result;
};

const getList = async (projectType) => {
    try {
        const result = await getDB()
            .collection(projectCollectionName)
            .find({ 'ProjectType.TypeId': projectType })
            .toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(projectCollectionName).insertOne(value);
        const getNewStudent = await findOneById(result.insertedId.toString());
        return getNewStudent;
    } catch (error) {
        throw new Error(error);
    }
};
const registerProject = async (idStudent, idProject) => {
    try {
        const valueRH = await validateSchemaRH({ idStudent: idStudent, idProject: idProject });
        await getDB()
            .collection(projectCollectionName)
            .findOneAndUpdate({ _id: ObjectId(idProject) }, { $push: { Member: idStudent } });
        await getDB().collection('Registration History').insertOne(valueRH);
        return await findOneById(idProject);
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
            .collection(projectCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
        const GetColumnUpdate = await findOneById(id);
        return GetColumnUpdate;
    } catch (error) {
        throw new Error(error);
    }
};

export const ProjectModel = {
    createNew,
    update,
    getFullProject,
    getProjectTypeList,
    getList,
    findOneById,
    search,
    registerProject,
};
