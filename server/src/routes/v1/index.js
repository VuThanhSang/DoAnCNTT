const express = require('express');
import { AuthRoute } from './auth.route';
import { StudentRoute } from './student.route';
import { LectureRoute } from './lecture.route';
import { ProjectRoute } from './project.route';
const router = express.Router();

router.use('/students', StudentRoute);
router.use('/lectures', LectureRoute);
router.use('/projects', ProjectRoute);
router.use('/auth', AuthRoute);
export const apiV1 = router;
