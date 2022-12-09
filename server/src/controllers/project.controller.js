import { ProjectService } from '../services/project.service';
import { HttpStatusCode } from '../utilities/constants';
const createNew = async (req, res) => {
    try {
        const result = await ProjectService.createNew(req.body);
        res.status(HttpStatusCode.OK).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const search = async (req, res) => {
    try {
        const result = await ProjectService.search(req.body.search);
        res.status(HttpStatusCode.OK).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const getFullProject = async (req, res) => {
    try {
        const result = await ProjectService.getFullProject();
        res.status(HttpStatusCode.OK).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const getProjectTypeList = async (req, res) => {
    try {
        const result = await ProjectService.getProjectTypeList();
        res.status(HttpStatusCode.OK).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const getList = async (req, res) => {
    try {
        const result = await ProjectService.getList(req.params.typeId);
        res.status(200).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const update = async (req, res) => {
    try {
        const id = req.params;
        const result = await ProjectService.update(id, req.body);
        res.status(HttpStatusCode.OK).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const registerProject = async (req, res) => {
    try {
        const result = await ProjectService.registerProject(req.body.student, req.body.project);
        res.status(HttpStatusCode.OK).json({ data: { project: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const findOneById = async (req, res) => {
    try {
        const id = req.params;
        const result = await ProjectService.findOneById(id);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const getListOfMajors = async (req, res) => {
    try {
        const result = await ProjectService.getListOfMajors(req.params.majors);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const ListProjectByLectureId = async (req, res) => {
    try {
        const result = await ProjectService.ListProjectByLectureId(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const getFollow = async (req, res) => {
    try {
        const result = await ProjectService.getFollow(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const followProject = async (req, res) => {
    try {
        const result = await ProjectService.followProject(req.body.studentId, req.body.projectId);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
export const ProjectController = {
    createNew,
    getFullProject,
    update,
    getProjectTypeList,
    getList,
    findOneById,
    search,
    registerProject,
    getListOfMajors,
    ListProjectByLectureId,
    getFollow,
    followProject,
};
