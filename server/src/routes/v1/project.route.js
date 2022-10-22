const express = require('express');
import { ProjectController } from '../../controllers/project.controller';
import { ProjectValidation } from '../../validations/project.validation';
const router = express.Router();

router.route('/create').post(ProjectValidation.createNew, ProjectController.createNew);
router.route('/update/:id').put(ProjectValidation.update, ProjectController.update);
router.route('/getFullProject').get(ProjectController.getFullProject);
export const ProjectRoute = router;
