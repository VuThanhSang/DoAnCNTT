import { cloneDeep } from 'lodash';
import { StudentModel } from '../models/students.model';
const fs = require('fs');
const createNew = async (data) => {
    try {
        const student = await StudentModel.createNew(data);
        return student;
    } catch (error) {
        throw new Error(error);
    }
};

const search = async (data) => {
    try {
        const result = await StudentModel.search(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data.body,
            Avatar: { img: fs.readFileSync('uploads/' + data.file.filename), contentType: 'image/png' },
            updateAt: Date.now(),
        };
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
        return students;
    } catch (error) {
        throw new Error(error);
    }
};

const registerMajors = async (id, data) => {
    try {
        const student = await StudentModel.registerMajors(id, data);
        return student;
    } catch (error) {
        throw new Error(error);
    }
};

const listStudentOfMajors = async (majorsName) => {
    try {
        const result = await StudentModel.listStudentOfMajors(majorsName);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const getRegistrationHistory = async (id) => {
    try {
        const result = await StudentModel.getRegistrationHistory(id);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
export const StudentService = {
    createNew,
    update,
    getFullStudent,
    search,
    registerMajors,
    listStudentOfMajors,
    getRegistrationHistory,
};
