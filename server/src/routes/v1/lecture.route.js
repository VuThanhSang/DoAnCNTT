const express = require('express');
import { verifyToken } from '../../middlewares/verifyToken';
import { LectureController } from '../../controllers/lecture.controller';
import { LectureValidation } from '../../validations/lecture.validation';
const router = express.Router();

router.route('/create').post(LectureValidation.createNew, LectureController.createNew);
router.route('/update/:id').put(LectureValidation.update, LectureController.update);
router.route('/getFullLecture').get(verifyToken, LectureController.getFullLecture);
export const LectureRoute = router;
