const express = require('express');
import { ProjectController } from '../../controllers/project.controller';
import { ProjectValidation } from '../../validations/project.validation';
import { verifyToken } from '../../middlewares/verifyToken';

const router = express.Router();

router.route('/create').post(ProjectValidation.createNew, ProjectController.createNew);
router.route('/update/:id').put(ProjectValidation.update, ProjectController.update);
router.route('/getProjectType').get(ProjectController.getProjectTypeList);
router.route('/getList/:typeId').get(ProjectController.getList);
router.route('/getFullProject').get(verifyToken, ProjectController.getFullProject);
router.route('/:id').get(ProjectController.findOneById);
router.route('/search').post(ProjectController.search);
router.route('/registerProject').post(verifyToken, ProjectController.registerProject);
router.route('/getListOfMajors/:majors').get(ProjectController.getListOfMajors);
export const ProjectRoute = router;
