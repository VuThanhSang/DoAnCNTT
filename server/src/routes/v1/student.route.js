const express = require('express');
import { StudentController } from '../../controllers/student.controller';
import { StudentValidation } from '../../validations/student.validation';
import { verifyToken } from '../../middlewares/verifyToken';
const router = express.Router();

router.route('/create').post(StudentValidation.createNew, StudentController.createNew);
router.route('/update/:id').put(StudentValidation.update, StudentController.update);
router.route('/getFullStudent').get(verifyToken, StudentController.getFullStudent);
export const StudentRoute = router;
