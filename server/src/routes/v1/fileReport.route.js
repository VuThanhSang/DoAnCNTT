const express = require('express');

import { verifyToken } from '../../middlewares/verifyToken';
import multer from 'multer';
import { fileReportController } from '../../controllers/fileReport.controller';
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route('/add').post(verifyToken, upload.array('files'), fileReportController.createNew);
router.route('/downloadFile/:id').get(fileReportController.downloadFile);
export const FileReportRoute = router;
