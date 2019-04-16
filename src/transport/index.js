import axios from 'axios';
import {root} from './constants';
import _memoize from 'lodash/memoize';
import localStorageMapping from '../store/localstorageMapping';
import handleNetworkError from './handleNetworkError';
import router, {route} from '../router';

const parseJwt = _memoize((token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
});

const checkTokenIsActive = (purpose) => () => {
    let token = localStorage.getItem(localStorageMapping[`${purpose}Token`]);

    if (!token || token === 'null' || token === null) {
        return false;
    }

    return parseJwt(token).exp * 1000 > Date.now();
};

const checkToken = {
    refresh: checkTokenIsActive('refresh'),
    access: checkTokenIsActive('access')
};

const axiosInstance = axios.create({
    baseURL: root,
    timeout: 5000,
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(localStorageMapping.accessToken)}`;

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.info('before request is sent', config);

    if (!checkToken.refresh()) {
        console.info('рефреш стух');
        // Пойти на авторизацию
        router.push(route.auth);
        return config;
    }

    if (!checkToken.access()) {
        // отложить запрос и пойти рефрешнуть
        console.info('access стух');
    }

    return config;
}, function (error) {
    handleNetworkError(error);
    // Do something with request error
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    console.info('after receive', response);
    return response;
}, function (error) {
    handleNetworkError(error);
    return Promise.reject(error);
});

export default axiosInstance;
