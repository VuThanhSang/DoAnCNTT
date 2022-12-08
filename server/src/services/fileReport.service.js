import { FileReportModel } from '../models/fileReport.model';

const fs = require('fs');

const createNew = async (data) => {
    try {
        const files = data.files.map((data) => {
            fs.readFileSync('uploads/' + data.originalname).toString('base64');
            return {
                file: data.originalname,
                contentType: data.mimetype,
            };
        });
        const addData = { ...data.body, files };
        const result = await FileReportModel.createNew(addData);
        console.log(result);
        return result;
        // const result = await FileReportModel.createNew(data);
    } catch (error) {
        throw new Error(error + '   service');
    }
};

export const FileReportService = { createNew };
