const Joi = require('joi');
import { HttpStatusCode } from '../utilities/constants';

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        Email: Joi.string().required(),
        MSSV: Joi.string().trim(),
        FullName: Joi.string().trim(),
        PhoneNumber: Joi.string().min(10).max(10).trim(),
        Majors: Joi.string().trim(),
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
        Email: Joi.string().required(),
        MSSV: Joi.string().trim(),
        FullName: Joi.string().trim(),
        PhoneNumber: Joi.string().min(10).max(10).trim(),
        Majors: Joi.string().trim(),
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

export const StudentValidation = { createNew, update };
