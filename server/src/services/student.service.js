import { cloneDeep } from 'lodash';
import { StudentModel } from '../models/students.model';
const createNew = async (data) => {
    try {
        const student = await StudentModel.createNew(data);
        return student;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = { ...data, updateAt: Date.now() };
        if (updateData._id) delete updateData._id;
        const result = await StudentModel.update(id, updateData);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullStudent = async () => {
    try {
        const students = await StudentModel.getFullStudent();
        if (!students) {
            throw new Error('Student = 0');
        }
        return students;
    } catch (error) {
        throw new Error(error);
    }
};

export const StudentService = { createNew, update, getFullStudent };
