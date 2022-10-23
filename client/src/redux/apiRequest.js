import { ConfigRouter } from '~/config';
import axios from 'axios';
import {
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    // registerStart,
    // registerSuccess,
} from './authSlice';
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3240/v1/',
});
export const loginGoogleUser = async (dispatch) => {
    dispatch(loginStart());
    try {
        const fetchDataUser = async () => {
            const request = await instance.get('auth/login/success');
            return request;
        };
        fetchDataUser().then(async (data) => {
            await dispatch(loginSuccess(data.data));
        });
    } catch {
        dispatch(registerFailed());
    }
};
export const logOutUser = async (id, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        console.log(accessToken);
        await axiosJWT.post('http://localhost:3240/v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logOutSuccess());
        navigate(ConfigRouter.Home);
    } catch {
        dispatch(logOutFailed());
    }
};
