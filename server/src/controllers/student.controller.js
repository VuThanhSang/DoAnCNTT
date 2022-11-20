import { StudentService } from '../services/student.service';
import { HttpStatusCode } from '../utilities/constants';
const createNew = async (req, res) => {
    try {
        const result = await StudentService.createNew(req.body);
        res.status(HttpStatusCode.OK).json({ data: { student: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const getFullStudent = async (req, res) => {
    try {
        const result = await StudentService.getFullStudent();
        res.status(HttpStatusCode.OK).json({ data: { student: result } });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const update = async (req, res) => {
    try {
        // console.log(req);
        const id = req.params;
        const result = await StudentService.update(id, req);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const search = async (req, res) => {
    try {
        const search = req.body.search;
        const result = await StudentService.search(search);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const registerMajors = async (req, res) => {
    try {
        const result = await StudentService.registerMajors(req.params, req.body.majors);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const listStudentOfMajors = async (req, res) => {
    try {
        const result = await StudentService.listStudentOfMajors(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const getRegistrationHistory = async (req, res) => {
    try {
        const result = await StudentService.getRegistrationHistory(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

export const StudentController = {
    createNew,
    getFullStudent,
    update,
    search,
    registerMajors,
    listStudentOfMajors,
    getRegistrationHistory,
};
