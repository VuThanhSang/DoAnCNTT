import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';

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

export const AuthService = { encodedAccessToken, encodedRefreshToken };
