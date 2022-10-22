import { ProjectModel } from '../models/project.model';

const createNew = async (data) => {
    try {
        const project = await ProjectModel.createNew(data);
        return project;
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

const getFullProject = async () => {
    try {
        const projects = await ProjectModel.getFullProject();
        return projects;
    } catch (error) {
        throw new Error(error);
    }
};

export const ProjectService = { createNew, update, getFullProject };
