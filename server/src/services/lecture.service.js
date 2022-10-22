import { LectureModel } from '../models/lectures.model';
const createNew = async (data) => {
    try {
        const lecture = await LectureModel.createNew(data);
        return lecture;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = { ...data, updateAt: Date.now() };
        if (updateData._id) delete updateData._id;
        const result = await LectureModel.update(id, updateData);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullLecture = async () => {
    try {
        const lectures = await LectureModel.getFullLecture();
        if (!lectures) {
            throw new Error('lecture = 0');
        }
        return lectures;
    } catch (error) {
        throw new Error(error);
    }
};

export const LectureService = { createNew, update, getFullLecture };
