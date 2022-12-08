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

export const login = async (email, password) => {
    try {
        const res = await axios.post('http://localhost:3240/v1/auth/login', { email: email, password: password });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const register = async (email, name, phone, password) => {
    try {
        const res = await axios.post('http://localhost:3240/v1/auth/register', {
            Email: email,
            Password: password,
            FullName: name,
            Phone: phone,
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};
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

export const searchStudent = async (axiosJWT, accessToken, query) => {
    try {
        const res = await axiosJWT.post(
            'http://localhost:3240/v1/students/search',
            { search: query },
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const searchLecture = async (axiosJWT, accessToken, query) => {
    try {
        const res = await axiosJWT.post(
            'http://localhost:3240/v1/lectures/search',
            { search: query },
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
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

export const filterMajors = async (axiosJWT, accessToken, majors) => {
    try {
        const res = await axiosJWT.get(`http://localhost:3240/v1/students/studentMajorsList/${majors}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const registerMajors = async (axiosJWT, accessToken, id, data, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axiosJWT.post(
            `http://localhost:3240/v1/students/registerMajors/${id}`,
            { majors: data },
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        dispatch(updateProfileSuccess(res.data));
    } catch (error) {
        dispatch(loginFailed());
    }
};
export const registerProject = async (axiosJWT, accessToken, studentId, projectId) => {
    try {
        const res = await axiosJWT.post(
            'http://localhost:3240/v1/projects/registerProject',
            {
                student: studentId,
                project: projectId,
            },
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const getListOfMajors = async (majors) => {
    try {
        const res = await axios.get(`http://localhost:3240/v1/projects/getListOfMajors/${majors}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const registrationHistory = async (axiosJWT, accessToken, id) => {
    try {
        const res = await axiosJWT.get(`http://localhost:3240/v1/students/registrationHistory/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const createNewProject = async (axiosJWT, accessToken, data) => {
    try {
        const res = await axiosJWT.post('http://localhost:3240/v1/projects/create', data, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};
export const uploadFile = async (axiosJWT, files, accessToken) => {
    try {
        const res = await axiosJWT.post('http://localhost:3240/v1/files/add', files, {
            headers: { token: `Bearer ${accessToken}` },
        });
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const ProjectOfLecture = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3240/v1/projects/listProjectOfLecture/${id}`);
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const ScoringProject = async (id, Note, Score) => {
    try {
        const res = await axios.put(`http://localhost:3240/v1/projects/update/${id}`, { Note: Note, Score: Score });
        return res.data.data;
    } catch (error) {
        return null;
    }
};
