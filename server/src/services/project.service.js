import { ProjectModel } from '../models/project.model';

const createNew = async (data) => {
    try {
        const project = await ProjectModel.createNew(data);
        return project;
    } catch (error) {
        throw new Error(error);
    }
};
const search = async (data) => {
    try {
        const result = await ProjectModel.search(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now() };
        if (updateData._id) delete updateData._id;
        const result = await ProjectModel.update(id, updateData);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getProjectTypeList = async () => {
    try {
        const types = await ProjectModel.getProjectTypeList();
        return types;
    } catch (error) {
        throw new Error(error);
    }
};

const getList = async (data) => {
    console.log(data);
    try {
        const result = await ProjectModel.getList(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullProject = async () => {
    try {
        const projects = await ProjectModel.getFullProject();
        return projects;
    } catch (error) {
        throw new Error(error);
    }
};
const registerProject = async (idStudent, idProject) => {
    try {
        const project = await ProjectModel.registerProject(idStudent, idProject);
        return project;
    } catch (error) {
        throw new Error(error);
    }
};
const findOneById = async (id) => {
    try {
        const project = await ProjectModel.findOneById(id);
        return project;
    } catch (error) {
        throw new Error(error);
    }
};
const getListOfMajors = async (data) => {
    try {
        const project = await ProjectModel.getListOfMajors(data);
        return project;
    } catch (error) {
        throw new Error(error);
    }
};
const ListProjectByLectureId = async (data) => {
    try {
        const result = await ProjectModel.ListProjectByLectureId(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
export const ProjectService = {
    createNew,
    update,
    getFullProject,
    getProjectTypeList,
    getList,
    findOneById,
    search,
    registerProject,
    getListOfMajors,
    ListProjectByLectureId,
};
