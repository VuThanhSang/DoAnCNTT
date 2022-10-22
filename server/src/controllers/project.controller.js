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
export const ProjectController = { createNew, getFullProject, update };
