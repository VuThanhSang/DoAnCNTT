import { FileReportService } from '../services/fileReport.service';
import { HttpStatusCode } from '../utilities/constants';
const path = require('path');
const createNew = async (req, res) => {
    try {
        const result = await FileReportService.createNew(req);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const downloadFile = async (req, res) => {
    res.download(`./uploads/${req.params.id}`);
};
export const fileReportController = { createNew, downloadFile };
