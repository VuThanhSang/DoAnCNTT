import { ConfigRouter } from '~/config';
import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    updateProfileSuccess,
    // registerStart,
    // registerSuccess,
} from './authSlice';
import {
    getListLectureFailed,
    getListLectureStart,
    getListLectureSuccess,
    getListStudentFailed,
    getListStudentStart,
    getListStudentSuccess,
} from './userSlice';
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
        localStorage.clear();
        dispatch(getListStudentFailed());
        dispatch(getListLectureFailed());
        dispatch(logOutSuccess());
        navigate(ConfigRouter.Home);
    } catch {
        dispatch(logOutFailed());
    }
};
export const getListLecture = async (axiosJWT, accessToken, dispatch) => {
    dispatch(getListLectureStart());
    try {
        const res = await axiosJWT.get('http://localhost:3240/v1/lectures/getFullLecture', {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};
export const getListStudent = async (axiosJWT, accessToken, dispatch) => {
    dispatch(getListStudentStart());
    try {
        const res = await axiosJWT.get('http://localhost:3240/v1/students/getFullStudent', {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const getProjectTypeList = async () => {
    try {
        const res = await axios.get('http://localhost:3240/v1/projects/getProjectType');
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const getProjectList = async (projectType) => {
    try {
        const res = await axios.get(`http://localhost:3240/v1/projects/getList/${projectType}`);
        console.log(res.data.data);
        return res.data.data;
    } catch (error) {
        return null;
    }
};
export const findOneProjectById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3240/v1/projects/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
};
export const updateStudentProfile = async (axiosJWT, accessToken, id, data, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axiosJWT.put(`http://localhost:3240/v1/students/update/${id}`, data, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(updateProfileSuccess(res.data));
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const searchStudent = async (query) => {
    try {
        const res = await axios.post('http://localhost:3240/v1/students/search', { search: query });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const searchLecture = async (query) => {
    try {
        const res = await axios.post('http://localhost:3240/v1/lectures/search', { search: query });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const searchProject = async (query) => {
    try {
        const res = await axios.post('http://localhost:3240/v1/projects/search', { search: query });
        return res.data.data;
    } catch (error) {
        return null;
    }
};
