import axios from 'axios';
import jwtDecode from 'jwt-decode';
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3240/v1/',
});
const refreshToken = async () => {
    try {
        const res = await instance.post('auth/refreshToken');
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                console.log(data);
                config.headers['token'] = 'Bearer ' + data.data.accessToken;
            }
            return config;
        },
        (err) => {
            console.log('asc');
            return Promise.reject(err);
        },
    );
    return newInstance;
};
