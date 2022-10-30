import Jwt from 'jsonwebtoken';
import passport from 'passport';
import { AuthService } from '../services/auth.service';
let userInfo = null;
let refreshTokenList = [];
const googleCallBack = [
    passport.authenticate('google', {
        failureRedirect: '/login/failed',
    }),
    async (req, res) => {
        userInfo = req.user;
        // console.log('log cho callback', userInfo);
        await res.redirect('http://localhost:3000');
    },
];
const loginSuccess = async (req, res) => {
    if (userInfo !== null && userInfo.data !== null) {
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
        if (userInfo == null) {
            res.json(null);
        } else {
            res.json({ success: false, message: 'Email không thuộc Trường Đại Học Sưu Phạm Kỹ thuật' });
            userInfo = null;
        }
    }
};
const loginFailed = (req, res, next) => {
    res.status(401).json({ error: 404 });
};
const logout = (req, res, next) => {
    res.clearCookie('refreshToken');
    userInfo = null;
    refreshTokenList = refreshTokenList.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json('Logged out successfully');
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
            console.log('loi day ne', err);
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
export const AuthController = { googleCallBack, loginSuccess, loginFailed, refresh, logout };
