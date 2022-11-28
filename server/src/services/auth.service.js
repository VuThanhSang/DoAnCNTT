import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { LectureModel } from '../models/lectures.model';

const encodedAccessToken = (userId, authType) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            id: userId,
            authType: authType,
            // iat: new Date().getTime(),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        },
    );
};

const encodedRefreshToken = (userId, authType) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            id: userId,
            authType: authType,
            // iat: new Date().getTime(),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_REFRESH,
        {
            expiresIn: '1w',
        },
    );
};
const login = async (data) => {
    try {
        const result = await LectureModel.login(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
export const AuthService = { encodedAccessToken, encodedRefreshToken, login };
