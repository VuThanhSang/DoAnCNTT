import express from 'express';
import passport from 'passport';
import { AuthController } from '../../controllers/auth.controller';
import { verifyToken } from '../../middlewares/verifyToken';
const passportConfig = require('../../middlewares/passport');

const router = express.Router();

router.route('/google').get(passport.authenticate('google', { scope: ['email', 'profile'] }));

router.route('/google/callback').get(AuthController.googleCallBack);

router.route('/login/failed').get(AuthController.loginFailed);
router.route('/login/success').get(AuthController.loginSuccess);
router.route('/login/failed').get(AuthController.loginFailed);
router.route('/refreshToken').post(AuthController.refresh);
router.route('/logout').post(verifyToken, AuthController.logout);
router.route('/login').post(AuthController.login);
router.route('/register').post(AuthController.register);
export const AuthRoute = router;
