const Joi = require('joi');
import { HttpStatusCode } from '../utilities/constants';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        Name: Joi.string().required().trim(),
        Instructor: Joi.string().required().trim(),
        Status: Joi.boolean(),
        Goal: Joi.string().trim(),
        Require: Joi.string().trim(),
        Product: Joi.string().trim(),
        Note: Joi.string().trim(),
        TotalStudents: Joi.number(),
        OtherMajorsRegister: Joi.boolean(),
        Majors: Joi.string().trim(),
        ProjectType: Joi.object({ TypeName: Joi.string().default(null), TypeId: Joi.string().default(null) }),
        Year: Joi.date(),
        Leader: Joi.string().trim(),
        Member: Joi.array().items(Joi.string().trim()),
        LectureCounterArgument: Joi.string().trim(),
        Score: Joi.string().trim(),
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message,
        });
    }
};

const update = async (req, res, next) => {
    const condition = Joi.object({
        Name: Joi.string().required().trim(),
        Instructor: Joi.string().required().trim(),
        Status: Joi.boolean(),
        Goal: Joi.string().trim(),
        Require: Joi.string().trim(),
        Product: Joi.string().trim(),
        Note: Joi.string().trim(),
        TotalStudents: Joi.number(),
        OtherMajorsRegister: Joi.boolean(),
        Majors: Joi.string().trim(),
        ProjectType: Joi.object({ TypeName: Joi.string().default(null), TypeId: Joi.string().default(null) }),
        Year: Joi.date(),
        Leader: Joi.string().trim(),
        Member: Joi.array().items(Joi.string().trim()),
        LectureCounterArgument: Joi.string().trim(),
        Score: Joi.string().trim(),
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message,
        });
    }
};

export const ProjectValidation = { createNew, update };
