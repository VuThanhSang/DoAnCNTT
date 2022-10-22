import Jwt from 'jsonwebtoken';
import passport from 'passport';
import { AuthService } from '../services/auth.service';
let userInfo = null;
let refreshTokenList = [];
const googleCallBack = [
    passport.authenticate('google', {
        failureRedirect: '/login/failed',
    }),
    (req, res) => {
        userInfo = req.user;
        res.redirect('http://localhost:3000');
    },
];
const loginSuccess = async (req, res) => {
    if (userInfo !== null) {
        const accessToken = await AuthService.encodedAccessToken(userInfo.data._id, userInfo.authType);
        const refreshToken = await AuthService.encodedRefreshToken(userInfo.data._id, userInfo.authType);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        refreshTokenList.push(refreshToken);
        res.status(200).json({
            success: true,
            message: 'successfully',
            user: userInfo,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } else {
        res.json(null);
    }
};
const loginFailed = (req, res, next) => {
    res.status(401).json({ error: 404 });
};
const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('refreshToken from cookie: ', refreshToken);
    console.log(refreshTokenList);
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokenList.includes(refreshToken)) {
        return res.status(403).json('RefreshToken is not valid');
    }
    Jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokenList = refreshTokenList.filter((token) => token !== refreshToken);
        const newAccessToken = AuthService.encodedAccessToken(user._id);
        const newRefreshToken = AuthService.encodedRefreshToken(user._id);
        refreshTokenList.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        res.status(200).json({ accessToken: newAccessToken });
    });
};
export const AuthController = { googleCallBack, loginSuccess, loginFailed, refresh };
