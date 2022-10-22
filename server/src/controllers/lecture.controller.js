import { LectureService } from '../services/lecture.service';
import { HttpStatusCode } from '../utilities/constants';
const createNew = async (req, res) => {
    try {
        const result = await LectureService.createNew(req.body);
        res.status(HttpStatusCode.OK).json({ data: { lecture: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const getFullLecture = async (req, res) => {
    try {
        const result = await LectureService.getFullLecture();
        res.status(HttpStatusCode.OK).json({ data: { lecture: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params;
        const result = await LectureService.update(id, req.body);
        res.status(HttpStatusCode.OK).json({ data: { lecture: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
export const LectureController = { createNew, getFullLecture, update };
