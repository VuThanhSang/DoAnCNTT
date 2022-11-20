const express = require('express');
import { StudentController } from '../../controllers/student.controller';
import { StudentValidation } from '../../validations/student.validation';
import { verifyToken } from '../../middlewares/verifyToken';
import multer from 'multer';
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

router.route('/create').post(StudentValidation.createNew, upload.single('Image'), StudentController.createNew);
router.route('/update/:id').put(upload.single('Image'), StudentController.update);
router.route('/getFullStudent').get(verifyToken, StudentController.getFullStudent);
router.route('/search').post(StudentController.search);
router.route('/registerMajors/:id').post(verifyToken, StudentController.registerMajors);
router.route('/studentMajorsList/:id').get(verifyToken, StudentController.listStudentOfMajors);
router.route('/registrationHistory/:id').get(verifyToken, StudentController.getRegistrationHistory);
export const StudentRoute = router;
